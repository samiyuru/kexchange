/**
 * Created by samiyuru on 6/2/14.
 */

var kexAdmin = angular.module("kexadmin", []);

kexAdmin.controller("appRegCtrl", function ($http, $scope) {
    var newApp = {
        name: "",
        desc: "",
        iconUrl: "",
        url: ""
    };
    var regedApps = [];

    loadRegApps();

    function register() {
        $http({
            url: "/apps/register",
            data: newApp,
            method: "POST"
        }).success(function (status) {
            if (status.success) {
                alert(newApp.name + " successfully registered");
                var app = status.data;
                regedApps.push(app);
            } else {
                alert(status.err);
            }
        });
    };

    function clear() {
        newApp.name = "";
        newApp.desc = "";
        newApp.iconUrl = "";
        newApp.url = "";
    };

    function loadRegApps() {
        $http({
            url: "/admin/apps",
            method: "GET"
        }).success(function (status) {
            if (status.success) {
                var apps = status.data;
                var aL = apps.length;
                for (var i = 0; i < aL; i++) {
                    var app = apps[i];
                    app.deleteApp = deleteApp;
                    regedApps.push(app);
                }
            } else {
                alert(status.err);
            }
        });
    }

    function deleteApp() {
        if (confirm('Are you sure you want to delete the app?')) {
            $http({
                url: "/apps/unregister",
                params: {
                    appid: this._id
                },
                method: "POST"
            }).success(function (status) {
                if (status.success) {
                    var delApp = status.data;
                    var aL = regedApps.length;
                    for (var i = 0; i < aL; i++) {
                        var app = regedApps[i];
                        if (app._id == delApp._id) {
                            regedApps.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    alert(status.err);
                }
            });
        }
    }

    $scope.newApp = newApp;
    $scope.regedApps = regedApps;
    $scope.register = register;
    $scope.clear = clear;
});