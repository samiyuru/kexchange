/**
 * Created by samiyuru on 6/3/14.
 */


angular.service("kexApps", function ($http, kexPofiles) {

    this.loadAvailableApps = function (cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/apps"
        }).success(function (data) {
            cb(data);
        });
    };

    this.loadInstalledApps = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + profID + "/apps"
        }).success(function (data) {
            cb(data);
        });
    };

    this.uninstallApp = function (appId, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/apps/" + appId + "/uninstall"
        }).success(function (data) {
            cb(data);
        });
    };

    this.installApp = function (appId, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/apps/" + appId + "/install"
        }).success(function (data) {
            cb(data);
        });
    };

});