/**
 * Created by samiyuru on 6/3/14.
 */

kEX.service("kexApps", function ($http, kexPofiles) {

    var selectedAppHndl = null;

    this.setSelectedAppHndl = function (appHndl) {
        selectedAppHndl = appHndl;
    };

    this.setSelectedApp = function (app) {
        if (!selectedAppHndl)return;
        selectedAppHndl.setSelectedApp(app);
    };

    this.unsetSelectedApp = function () {
        if (!selectedAppHndl)return;
        selectedAppHndl.unsetSelectedApp();
    };

    this.loadAvailableApps = function (cb) {
        $http({
            method: "GET",
            url: "/apps"
        }).success(function (data) {
            cb(data);
        });
    };

    this.loadInstalledApps = function (profID, cb) {
        $http({
            method: "GET",
            url: "/api/profile/" + profID + "/apps"
        }).success(function (data) {
            cb(data);
        });
    };

    this.uninstallApp = function (appId, cb) {
        $http({
            method: "GET",
            url: "/apps/" + appId + "/uninstall"
        }).success(function (data) {
            cb(data);
        });
    };

    this.installApp = function (appId, cb) {
        $http({
            method: "GET",
            url: "/apps/" + appId + "/install"
        }).success(function (data) {
            cb(data);
        });
    };


    this.userEarnings = function (cb) {
        $http({
            method: "GET",
            params: {
                skip: 0,
                limit: 6
            },
            url: "/apps/user-earnings"
        }).success(function (data) {
            cb(data);
        });
    };

});