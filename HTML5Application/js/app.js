/* 
 * Samiyuru Senarathne
 */

var kEX = angular.module("kExchange", ['ngRoute']);

kEX.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home-part.html',
                controller: 'recntPrdCtrlr'
            }).
            when('/store', {
                templateUrl: 'partials/store-part.html',
                controller: 'recntPrdCtrlr'
            }).
            when('/bank', {
                templateUrl: 'partials/bank-part.html',
                controller: 'recntPrdCtrlr'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);


kEX.controller("recntPrdCtrlr", function($scope){
    $scope.prdcts = [0, 1, 2];
});

kEX.controller("recntErnngsCtrlr", function($scope){
    $scope.ernngs = [0, 1, 2, 3, 4, 5, 6];
});

kEX.controller("topErnrsCtrlr", function($scope){
    $scope.tpErners = [0, 1, 2];
});

kEX.controller("tpWlthyCtrler", function($scope){
    $scope.tpErners = [0, 1, 2];
});

kEX.controller("tpWlthyCtrler", function($scope){
    $scope.wlthyPrsns = [0, 1, 2, 4, 5, 6];
});