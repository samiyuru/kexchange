/* 
 * Samiyuru Senarathne
 */

var PRODUCT_BID_EVENT = "product_bid_event"; //bid or purchase
var PRODUCT_PURCHASE_EVENT = "product_purchase_event"; //bid or purchase
var PRODUCT_RESELL_EVENT = "product_resell_event"; //resell

var kEX = angular.module("kExchange", ['ngRoute', 'ngCookies']);

kEX.config(['$routeProvider', function ($routeProvider) {
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
        when('/profile/:id', {
            templateUrl: 'partials/profile-part.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
