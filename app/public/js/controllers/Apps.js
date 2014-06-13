/**
 * Created by samiyuru on 6/3/14.
 */

kEX.controller("installedAppsCtrl", function ($scope, kexApps) {
    var selectedApp = null;
    var apps = [
        {
            name: "Attendance app",
            desc: "You can earn money for your participation in company events",
            userCount: 12,
            iconUrl: "http://localhost:3000/img/earning-ico001.png"
        },
        {
            name: "Other app",
            desc: "You can earn money for your participation in company events",
            userCount: 12,
            iconUrl: "http://localhost:3000/img/earning-ico001.png"
        },
        {
            name: "Another app",
            desc: "You can earn money for your participation in company events",
            userCount: 12,
            iconUrl: "http://localhost:3000/img/earning-ico001.png"
        },
        {
            name: "Some app",
            desc: "You can earn money for your participation in company events",
            userCount: 12,
            iconUrl: "http://localhost:3000/img/earning-ico001.png"
        }
    ];

    function removeApp(app) {
        var aL = apps.length;
        for (var i = 0; i < aL; i++) {
            var _app = apps[i];
            if (_app._id == app._id) {
                apps.splice(i, 1);
                $scope.$apply();
                break;
            }
        }
    }

    function selectApp(app) {
        if (selectedApp) {
            selectedApp.active = false;
        }
        app.active = true;
        selectedApp = app;
        app.remove = function () {
            removeApp(app);
        }
        kexApps.setSelectedApp(app);
    }

    $scope.$on('$destroy', function () {
        kexApps.unsetSelectedApp();
    });

    $scope.apps = apps;
    $scope.selectApp = selectApp;
});

kEX.controller("availableAppsCtrl", function ($scope, kexApps) {
    var apps = [
        installableAppDeco({
            _id: 12312,
            name: "Attendance app",
            desc: "You can earn money for your participation in company events",
            userCount: 12,
            iconUrl: "http://localhost:3000/img/earning-ico001.png"
        }, installHndl),
        installableAppDeco({
            _id: 8367,
            name: "Attendance app",
            desc: "You can earn money for your participation in company events",
            userCount: 12,
            iconUrl: "http://localhost:3000/img/earning-ico001.png"
        }, installHndl)
    ];

    function installHndl(app) {
        app.isInstalled = true;
        window.setTimeout(function () {
            var aL = apps.length;
            for (var i = 0; i < aL; i++) {
                var _app = apps[i];
                if (_app._id == app._id) {
                    apps.splice(i, 1);
                    $scope.$apply();
                    break;
                }
            }
        }, 3000);
    };

    function installableAppDeco(app, instHndl) {
        var decApp = null;

        function Installable() {
            this.ui = {
                installConf: false
            };
            this.isInstalled = false;
        }

        Installable.prototype = app;

        Installable.prototype.showInstallConf = function () {
            this.ui.installConf = true;
        };

        Installable.prototype.hideInstallConf = function () {
            this.ui.installConf = false;
        };

        Installable.prototype.installApp = function () {
            instHndl(decApp);
        };

        decApp = new Installable();
        return decApp;
    }

    $scope.apps = apps;
});

kEX.controller("selectedAppCtrl", function ($scope, kexApps) {
    var ui = {
        uninsConf: false
    };
    var app = null;

    kexApps.setSelectedAppHndl({
        setSelectedApp: function (_app) {
            $scope.app = app = _app;
        },
        unsetSelectedApp: function () {
            $scope.app = app = null;
        }
    });

    function showUninsConf() {
        ui.uninsConf = true;
    }

    function hideUninsConf() {
        ui.uninsConf = false;
    }

    function uninstall() {
        ui.uninsConf = false;
        app.remove();//remove app from installed apps list
        $scope.app = app = null;
    }

    $scope.$on('$destroy', function () {
        kexApps.setSelectedAppHndl(null);
    });

    $scope.ui = ui;
    $scope.app = app;
    $scope.showUninsConf = showUninsConf;
    $scope.hideUninsConf = hideUninsConf;
    $scope.uninstall = uninstall;
});