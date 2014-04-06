/* 
 * Samiyuru Senarathne
 */

kEX.controller("kexroot", function ($rootScope, $location, kexPofiles) {

    $rootScope.$on('$locationChangeSuccess', function () {
        var urlPrts = $location.url().substr(1).split('/');
        if (urlPrts[0] == 'profile') { //url should be like /profile/32324234wfsdfsd or /profile
            if (urlPrts.length == 1) {
                $rootScope.$emit(PROFILE_URL_CHANGED, kexPofiles.getLoggedID());
            } else if(urlPrts.length >= 2){
                $rootScope.$emit(PROFILE_URL_CHANGED, urlPrts[1]);
            }
        }
    });

});

kEX.controller("prdctsCtrlr", function ($scope) {
    $scope.products = [
        {
            id: 0002,
            name: "Domain driven development session",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        }
    ];
});

kEX.controller("recntErnngsCtrlr", function ($scope) {
    $scope.ernngs = [
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        }
    ];
});

kEX.controller("topErnrsCtrlr", function ($scope) {
    $scope.tpErners = [
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 01
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 02
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 03
        }
    ];
});

kEX.controller("tpWlthyCtrler", function ($scope, kexPofiles) {
    $scope.wlthyPrsns = wlthyPrsns = [];

    kexPofiles.loadProfiles(function (data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            wlthyPrsns.push(data[i]);
        }
    });

});

kEX.controller("coverCtrlr", function ($scope) {
    $scope.name = "Samiyuru Senarathne";
    $scope.status = "Millionaire";
    $scope.balance = 10000;
    $scope.loan = 5000;
    $scope.propic = "propic01.png";
});

kEX.controller("accountCtrl", function ($scope) {
    $scope.accLogs = [
        {
            detail: "Loan from Saman",
            timeago: "1 month ago",
            amount: 300,
            balance: 3000
        },
        {
            detail: "Blog earning",
            timeago: "2 days ago",
            amount: 800,
            balance: 6000
        },
        {
            detail: "Investment in Gayan",
            timeago: "1 week ago",
            amount: 200,
            balance: 7000
        },
        {
            detail: "Loan from Saman",
            timeago: "1 day ago",
            amount: 300,
            balance: 3300
        },
        {
            detail: "Loan from Saman",
            timeago: "1 min ago",
            amount: 200,
            balance: 9000
        },
        {
            detail: "Loan from Saman",
            timeago: "1 hour ago",
            amount: 800,
            balance: 6000
        },
        {
            detail: "Loan from Anil",
            timeago: "1 day ago",
            amount: 40,
            balance: 1000
        }
    ];
});

kEX.controller("loanCtrl", function ($scope) {
    $scope.investors = [
        {
            investor: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Amila",
                propic: "propic01.png"
            },
            amount: 1000,
            timeago: 100,
            interest: 10
        },
        {
            investor: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Darshatha",
                propic: "propic02.png"
            },
            amount: 1000,
            timeago: 100,
            interest: 10
        },
        {
            investor: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Nimal",
                propic: "propic01.png"
            },
            amount: 1000,
            timeago: 100,
            interest: 10
        },
        {
            investor: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Hasith",
                propic: "propic02.png"
            },
            amount: 1000,
            timeago: 100,
            interest: 10
        }
    ];
    $scope.loans = [
        {
            investor: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Amila",
                propic: "propic01.png"
            },
            amount: 1000,
            timeago: 100,
            interest: 10
        },
        {
            investor: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Darshatha",
                propic: "propic02.png"
            },
            amount: 1000,
            timeago: 100,
            interest: 10
        },
        {
            investor: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Nimal",
                propic: "propic01.png"
            },
            amount: 1000,
            timeago: 100,
            interest: 10
        }
    ];
});

kEX.controller("myInvestCtrl", function ($scope, $rootScope, kexPofiles) {
    $scope.investments = [
        {
            timeago: "1 month ago",
            amount: 1000,
            rate: 5,
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            timeago: "1 month ago",
            amount: 1000,
            rate: 5,
            person: null
        },
        {
            timeago: "1 month ago",
            amount: 1000,
            rate: 5,
            person: null
        },
        {
            timeago: "1 month ago",
            amount: 1000,
            rate: 5,
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        }
    ];
});

kEX.controller("newPrdCtrl", function ($scope) {

});

kEX.controller("mybidsctrl", function ($scope) {

});