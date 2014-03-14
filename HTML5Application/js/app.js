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
            when('/bank', {
                templateUrl: 'partials/bank-part.html'
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
    $scope.tpErners = [0, 1, 2];
});

kEX.controller("tpWlthyCtrler", function($scope){
    $scope.wlthyPrsns = [0, 1, 2, 4, 5, 6];
});

kEX.controller("coverctrlr", function($scope){
    $scope.name = "Samiyuru Senarathne";
    $scope.status = "Millionaire";
    $scope.balance = 10000;
    $scope.loan = 5000;
    $scope.propic = "propic01.png";
});