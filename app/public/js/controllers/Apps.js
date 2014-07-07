/**
 * Created by samiyuru on 6/3/14.
 */

kEX.controller("installedAppsCtrl", function ($scope, kexApps, kexPofiles) {
    var selectedApp = null;
    var apps = [];

    kexApps.loadInstalledApps(kexPofiles.getLoggedProf()._id, function (status) {
        if (status.success) {
            var _apps = status.data;
            var aL = _apps.length;
            for (var i = 0; i < aL; i++) {
                var _app = _apps[i];
                _app.getUrl = function () {
                    return '/apps/' + _app._id + '?auth=' + kexPofiles.getAuthToken();
                };
                apps.push(_app);
            }
        } else {
            alert(status.err)
        }
    });

    function removeApp(app) {
        var aL = apps.length;
        for (var i = 0; i < aL; i++) {
            var _app = apps[i];
            if (_app._id == app._id) {
                apps.splice(i, 1);
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
    var apps = [];

    kexApps.loadAvailableApps(function (status) {
        if (status.success) {
            var _apps = status.data;
            var aL = _apps.length;
            for (var i = 0; i < aL; i++) {
                var _app = _apps[i];
                _app = installableAppDeco(_app, installHndl);
                apps.push(_app);
            }
        } else {
            alert(status.err)
        }
    });

    function installHndl(app) {
        kexApps.installApp(app._id, function (status) {
            if (status.success) {
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
            } else {
                alert(status.err)
            }
        });
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
        kexApps.uninstallApp(app._id, function (status) {
            if (status.success) {
                ui.uninsConf = false;
                app.remove();//remove app from installed apps list
                $scope.app = app = null;
            } else {
                alert(status.err)
            }
        });
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