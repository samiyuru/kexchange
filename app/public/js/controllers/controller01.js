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


kEX.controller("recntErnngsCtrlr", function ($scope, kexPofiles) {
    $scope.ernngs = [
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "/img/earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "/img/propic02.png"
            }
        }
    ];
});

kEX.controller("topErnrsCtrlr", function ($scope, kexPofiles) {
    var tpErners = [];

    kexPofiles.loadTopEarners(function loadWlthyPplCB(status) {
        var profiles = status.data;
        var len = profiles.length;
        for (var i = 0; i < len; i++) {
            tpErners.push(profiles[i]);
        }
    });

    $scope.tpErners = tpErners;
});

kEX.controller("tpWlthyCtrler", function ($scope, kexPofiles) {
    var wlthyPrsns = [];

    kexPofiles.loadProfiles(function loadWlthyPplCB(status) {
        var profiles = status.data;
        var len = profiles.length;
        for (var i = 0; i < len; i++) {
            wlthyPrsns.push(profiles[i]);
        }
    });

    $scope.wlthyPrsns = wlthyPrsns;
});

kEX.controller("coverCtrlr", function ($scope, kexPofiles) {
    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        $scope.profile = profile;
    });
});



