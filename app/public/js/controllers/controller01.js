/* 
 * Samiyuru Senarathne
 */

kEX.controller("kexroot", function ($scope, kexPofiles, $rootScope, $location) {
    $scope.isLogged = false;//hide ui controllers like navigation
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

kEX.controller("loginCtrl", function ($scope, kexPofiles, $location, $window) {
    var user = {
        username: "",
        password: ""
    };

    $scope.loginProgress = false;

    function login() {
        if ($window.FB) {
            $window.FB.login(function (response) {
                $scope.loginProgress = true;
                if (response.status === 'connected') {
                    kexPofiles.registerUser(response.authResponse.accessToken, function (status) {
                        $scope.loginProgress = false;
                        if (status.success) {
                            $location.path('/');
                        } else {
                            alert(status.err);
                        }
                    });
                } else {
                    $scope.loginProgress = false;
                    alert('unable to login with facebook');
                }
            }, {scope: 'public_profile,email'});
        }
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



