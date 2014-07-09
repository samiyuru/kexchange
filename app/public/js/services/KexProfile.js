/**
 * Created by samiyuru on 4/15/14.
 */

kEX.service("kexPofiles", function ($http, $rootScope, $location, $cookieStore) {

    var _loggedProf = null;
    var _curProfile;// currently shown profile
    //var _profileService = this;
    var _authToken = null;

    //----------------------------------------

    this.loadTopEarners = function (cb) {
        $http({
            method: "GET",
            url: "/api/topearners",
            params: {
                skip: 0,
                limit: 3
            }
        }).success(function (data) {
            cb(data);
        });
    };

    this.loadProfiles = function (cb) {
        $http({
            method: "GET",
            url: "/api/profiles",
            params: {
                skip: 0,
                limit: 8
            }
        }).success(function (data) {
            cb(data);
        });
    };

    this.loadAccounts = function (profId, cb) {
        $http({
            method: "GET",
            params: {
                skip: 0,
                limit: 50
            },
            url: "/api/profile/" + profId + "/accounts"
        }).success(function (data) {
            cb(data);
        });
    };

    //----------------------------------------

    this.getCurrentProfpageID = function () {
        if (_curProfile)
            return _curProfile._id;
        else
            return null;
    }

    this.getLoggedProf = function () {
        return _loggedProf;
    };

    this.getAuthToken = function () {
        return _authToken;
    };

    this.setLoggedProf = function (profile) {
        _loggedProf = profile;
    };

    this.validateToken = function (cb) {
        if (_authToken)
            return cb(true);
        _authToken = $cookieStore.get("authToken");
        if (_authToken) {
            $http({
                method: "GET",
                params: {
                    auth: _authToken
                },
                url: "/api/authorize/"
            }).success(function (data) {
                if (data.success) {
                    _loggedProf = data.data;
                    cb(true);
                } else {
                    _authToken = null;
                    _loggedProf = null;
                    $cookieStore.remove("authToken");
                    cb(false);
                }
            });
        } else {
            cb(false);
        }
    };

    this.registerUser = function (token, provider, cb) {
        $http({
            method: "POST",
            params: {
                token: token,
                provider: provider
            },
            url: "/api/profile/register"
        }).success(function (data) {
            if (data.success) {
                _authToken = data.data.authToken;
                _loggedProf = data.data.profile;
                $cookieStore.put("authToken", _authToken);
            } else {
                _authToken = null;
                _loggedProf = null;
            }
            cb(data);
        });
    }

    //----------------------------------------

    this.getProfile = function (profID, cb) {
        $http({
            method: "GET",
            url: "/api/profile/" + profID
        }).success(function (data) {
            cb(data);
        });
    }

    this.getCurrentProfile = function (cb) {
        var urlPrts = $location.url().substr(1).split('/');
        if (urlPrts[0] == 'profile') { //url should be like /profile/32324234wfsdfsd or /profile
            if (urlPrts.length == 1) {
                cb(_loggedProf);
            } else if (urlPrts.length >= 2) {
                var profID = urlPrts[1];
                if (profID == _loggedProf._id) {
                    cb(_loggedProf);
                    return;
                }
                this.getProfile(profID, function (data) {
                    if (data.success) {
                        var _curProfile = data.data;
                        cb(_curProfile);
                    }
                });
            }
        } else {
            cb(_loggedProf);
        }
    }
});
