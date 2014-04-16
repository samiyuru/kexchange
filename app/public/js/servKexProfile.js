/**
 * Created by samiyuru on 4/15/14.
 */

kEX.service("kexPofiles", function ($http, $rootScope, $location) {

    var _loggedProf = null;
    var _curProfile;// currently shown profile
    var _limit = 5;
    var _skip = 0;
    var _profileService = this;
    var _authToken;

    //----------------------------------------

    this.loadProfiles = function (cb) {
        $http({
            method: "GET",
            url: "/api/profiles",
            params: {
                skip: _skip,
                limit: _limit,
                auth: this.getAuthToken()
            }
        }).success(function (data) {
                cb(data);
            });
    };

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

    this.authorize = function (user, pass, cb) {
        $http({
            method: "POST",
            data: {
                user: user,
                pass: pass
            },
            url: "/api/authorize/"
        }).success(function (data) {
                _authToken = (data.success) ? data.data.token : null;
                if (data.success) {
                    _authToken = data.data.token;
                    _loggedProf = data.data.profile;
                } else {
                    _authToken = null;
                    _loggedProf = null;
                }
                cb(data);
            });
    };

    //----------------------------------------

    this.getProfile = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: this.getAuthToken()
            },
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
                _profileService.getProfile(profID, function (data) {
                    if (data.success) {
                        var _curProfile = data.data;
                        cb(_curProfile);
                    }
                });
            }
        } else {
            return _loggedProf;
        }
    }
});
