/**
 * Created by samiyuru on 4/15/14.
 */

kEX.service("kexPofiles", function ($http, $rootScope, $location) {

    var _loggedProf = {
        _id: "5346c1ed2466e9ce2a6b577c",
        nickname: "Samiyuru b0fb7d3d",
        name: "Samiyuru Senarathne",
        wealth: 0,
        propic: "/propics/propic01.png"
    };

    var _curProfile;// currently shown profile

    var _limit = 5;
    var _skip = 0;
    var _isLoading = false;
    var _profileService = this;

    this.loadProfiles = function (cb) {
        if (!_isLoading) {
            $http({
                method: "GET",
                url: "/api/profiles",
                params: {
                    skip: _skip,
                    limit: _limit
                }
            }).success(function (data) {
                    cb(data);
                    _isLoading = false;
                }).error(function (data) {
                    _isLoading = false;
                });
        }
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
        return _loggedProf._id;
    };

    this.setLoggedProf = function (profile) {
        _loggedProf = profile;
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
