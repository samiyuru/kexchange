/**
 * Created by samiyuru on 6/3/14.
 */


angular.service("kexApps", function () {

    this.loadAvailableApps = function (cb) {
        $http({
            method: "GET",
            params: {},
            url: ""
        }).success(function (data) {
                cb(data);
            });
    };

    this.loadInstalledApps = function (cb) {
        $http({
            method: "GET",
            params: {},
            url: ""
        }).success(function (data) {
                cb(data);
            });
    };

    this.uninstallApp = function () {
        $http({
            method: "GET",
            params: {},
            url: ""
        }).success(function (data) {
                cb(data);
            });
    };

    this.installApp = function () {
        $http({
            method: "GET",
            params: {},
            url: ""
        }).success(function (data) {
                cb(data);
            });
    };

});