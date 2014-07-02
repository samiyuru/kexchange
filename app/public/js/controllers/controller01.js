/* 
 * Samiyuru Senarathne
 */

kEX.controller("kexroot", function ($scope, kexPofiles, $rootScope, $location) {
    $scope.isLogged = false;//hide ui controllers
    $scope.isLoginChecked = false;

    function loginCheck() {
        kexPofiles.validateToken(function (isLoggedin) {
            $scope.isLoginChecked = true;
            if (isLoggedin) {
                $scope.isLogged = true;
            } else {
                if ($location.url() != '/login') $location.path('/login');
                $scope.isLogged = false;
            }
        });
    }

    $rootScope.$on("$routeChangeSuccess", function () {
        $scope.isLoginChecked = false;
        loginCheck();
    });
});

kEX.controller("loginCtrl", function ($scope, kexPofiles, $location) {
    var user = {
        username: "",
        password: ""
    };

    function login() {
        kexPofiles.authorize(user.username, user.password, function (status) {
            if (status.success) {
                $location.path('/');
            } else {
                alert(status.err);
            }
        });
    }

    $scope.user = user;
    $scope.login = login;
});


kEX.controller("recntErnngsCtrlr", function ($scope, kexApps) {
    $scope.ernngs = [];

    kexApps.userEarnings(function (status) {
        if (status.success) {
            $scope.ernngs = status.data;
        } else {
            alert(status.err);
        }
    });
});

kEX.controller("topErnrsCtrlr", function ($scope, kexPofiles) {
    $scope.tpErners = [];

    kexPofiles.loadTopEarners(function loadWlthyPplCB(status) {
        if (status.success) {
            $scope.tpErners = status.data;
        } else {
            alert(status.err);
        }
    });
});

kEX.controller("tpWlthyCtrler", function ($scope, kexPofiles) {
    $scope.wlthyPrsns = [];

    kexPofiles.loadProfiles(function loadWlthyPplCB(status) {
        if (status.success) {
            $scope.wlthyPrsns = status.data;
        } else {
            alert(status.err);
        }
    });
});

kEX.controller("coverCtrlr", function ($scope, kexPofiles) {
    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        $scope.profile = profile;
    });
});



