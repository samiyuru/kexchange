/* 
 * Samiyuru Senarathne
 */

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
