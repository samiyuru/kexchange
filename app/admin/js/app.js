/**
 * Created by samiyuru on 6/2/14.
 */

var kexAdmin = angular.module("kexadmin", []);

kexAdmin.controller("rootCtrl", function ($http, $scope) {

    var user = {
        username: "",
        password: ""
    };

    function login() {
        $scope.adminAuth = CryptoJS.MD5(user.username + user.password);
        $http({
            method: 'post',
            url: '/admin/validate',
            headers: {
                auth: $scope.adminAuth
            }
        }).success(function (status) {
            if (status.success) {
                $scope.isLogged = true;
            } else {
                $scope.adminAuth = null;
                alert(status.err)
            }
        });
    }

    $scope.user = user;
    $scope.isLogged = false;
    $scope.login = login;
});

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
            url: "/admin/register-app",
            data: newApp,
            method: "POST",
            headers: {
                auth: $scope.adminAuth
            }
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
            method: "GET",
            headers: {
                auth: $scope.adminAuth
            }
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
                url: "/admin/unregister-app",
                params: {
                    appid: this._id
                },
                method: "POST",
                headers: {
                    auth: $scope.adminAuth
                }
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