/**
 * Created by samiyuru on 3/26/14.
 */

kEX.factory("kexPofiles", function ($http) {

    var _loggedID = null;

    var _limit = 5;
    var _skip = 0;
    var _isLoading = false;

    function loadProfiles(cb) {
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
    }

    function getLoggedID(){
        return _loggedID;
    }

    function setLoggedID(id){
        _loggedID = id;
    }

    return {
        loadProfiles: loadProfiles,
        getLoggedID: getLoggedID,
        setLoggedID: setLoggedID
    };

});