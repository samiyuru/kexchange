/* 
 * Samiyuru Senarathne
 */

var kEX = angular.module("kExchange", ['ngRoute']);

kEX.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home-part.html'
            }).
            when('/store', {
                templateUrl: 'partials/store-part.html'
            }).
            when('/profile', {
                templateUrl: 'partials/profile-part.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);


kEX.controller("prdctsCtrlr", function($scope){
    $scope.products = [
        {
            id:0002,
            name:"Session Tickets",
            left:2,
            prdcover:"product-cover001.png",
            seller:{
                id:0001,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            }
        },

        {
            id:0002,
            name:"Session Tickets",
            left:2,
            prdcover:"product-cover001.png",
            seller:{
                id:0001,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            }
        },

        {
            id:0002,
            name:"Session Tickets",
            left:2,
            prdcover:"product-cover001.png",
            seller:{
                id:0001,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            }
        }];
});

kEX.controller("recntErnngsCtrlr", function($scope){
    $scope.ernngs = [
        {
            head:"Blogger Earning",
            amount:100,
            detail:"For the blogger you mentioned",
            srcimg:"earning-ico001.png",
            timeago:"Yesterday",
            link:"#"
        }, {
            head:"Blogger Earning",
            amount:100,
            detail:"For the blogger you mentioned",
            srcimg:"earning-ico001.png",
            timeago:"Yesterday",
            link:"#"
        }, {
            head:"Blogger Earning",
            amount:100,
            detail:"For the blogger you mentioned",
            srcimg:"earning-ico001.png",
            timeago:"Yesterday",
            link:"#"
        }, {
            head:"Blogger Earning",
            amount:100,
            detail:"For the blogger you mentioned",
            srcimg:"earning-ico001.png",
            timeago:"Yesterday",
            link:"#"
        }, {
            head:"Blogger Earning",
            amount:100,
            detail:"For the blogger you mentioned",
            srcimg:"earning-ico001.png",
            timeago:"Yesterday",
            link:"#"
        }, {
            head:"Blogger Earning",
            amount:100,
            detail:"For the blogger you mentioned",
            srcimg:"earning-ico001.png",
            timeago:"Yesterday",
            link:"#"
        }, {
            head:"Blogger Earning",
            amount:100,
            detail:"For the blogger you mentioned",
            srcimg:"earning-ico001.png",
            timeago:"Yesterday",
            link:"#"
        }
    ];
});

kEX.controller("topErnrsCtrlr", function($scope){
    $scope.tpErners = [
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:01
        },
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:02
        },
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:03
        }];
});

kEX.controller("tpWlthyCtrler", function($scope){
    $scope.wlthyPrsns = [
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:01
        },
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:02
        },
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:03
        },
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:01
        },
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:02
        },
        {
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic01.png"
            },
            earning:10000,
            place:03
        }];
});

kEX.controller("coverCtrlr", function($scope){
    $scope.name = "Samiyuru Senarathne";
    $scope.status = "Millionaire";
    $scope.balance = 10000;
    $scope.loan = 5000;
    $scope.propic = "propic01.png";
});

kEX.controller("accountCtrl", function($scope){
    $scope.accLogs = [{
        detail:"Loan from Saman",
        timeago:"1 month ago",
        amount:300,
        balance:3000
    },{
        detail:"Blog earning",
        timeago:"2 days ago",
        amount:800,
        balance:6000
    },{
        detail:"Investment in Gayan",
        timeago:"1 week ago",
        amount:200,
        balance:7000
    },{
        detail:"Loan from Saman",
        timeago:"1 day ago",
        amount:300,
        balance:3300
    },{
        detail:"Loan from Saman",
        timeago:"1 min ago",
        amount:200,
        balance:9000
    },{
        detail:"Loan from Saman",
        timeago:"1 hour ago",
        amount:800,
        balance:6000
    },{
        detail:"Loan from Anil",
        timeago:"1 day ago",
        amount:40,
        balance:1000
    }];
});

kEX.controller("loanCtrl", function($scope){
    $scope.investors = [
        {
            investor:{
                id:0001,
                wealth:3000,
                name:"Amila",
                propic:"propic01.png"
            },
            amount:1000,
            timeago: 100,
            interest: 10
        },
        {
            investor:{
                id:0001,
                wealth:3000,
                name:"Darshatha",
                propic:"propic02.png"
            },
            amount:1000,
            timeago: 100,
            interest: 10
        },
        {
            investor:{
                id:0001,
                wealth:3000,
                name:"Nimal",
                propic:"propic01.png"
            },
            amount:1000,
            timeago: 100,
            interest: 10
        },
        {
            investor:{
                id:0001,
                wealth:3000,
                name:"Hasith",
                propic:"propic02.png"
            },
            amount:1000,
            timeago: 100,
            interest: 10
        }
    ];
    $scope.loans = [
        {
            investor:{
                id:0001,
                wealth:3000,
                name:"Amila",
                propic:"propic01.png"
            },
            amount:1000,
            timeago: 100,
            interest: 10
        },
        {
            investor:{
                id:0001,
                wealth:3000,
                name:"Darshatha",
                propic:"propic02.png"
            },
            amount:1000,
            timeago: 100,
            interest: 10
        },
        {
            investor:{
                id:0001,
                wealth:3000,
                name:"Nimal",
                propic:"propic01.png"
            },
            amount:1000,
            timeago: 100,
            interest: 10
        }
    ];
});

kEX.controller("myInvestCtrl", function($scope){
    $scope.investments = [
        {
            timeago:"1 month ago",
            amount:1000,
            rate:5,
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic02.png"
            }
        },
        {
            timeago:"1 month ago",
            amount:1000,
            rate:5,
            person:null
        },
        {
            timeago:"1 month ago",
            amount:1000,
            rate:5,
            person:null
        },
        {
            timeago:"1 month ago",
            amount:1000,
            rate:5,
            person:{
                id:0001,
                wealth:3000,
                name:"Samiyuru Senarathne",
                propic:"propic02.png"
            }
        }
    ];
});