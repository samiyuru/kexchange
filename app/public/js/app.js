/* 
 * Samiyuru Senarathne
 */

var PRODUCT_INIT_BID_EVENT = "product_init_bid_event"; //first bid
var PRODUCT_BID_EVENT = "product_bid_event"; //bid
var PRODUCT_PURCHASE_EVENT = "product_purchase_event"; //purchase
var PRODUCT_RESELL_EVENT = "product_resell_event"; //resell

var INVEST_NEW_SHOW = "INVEST_NEW_SHOW"; //show new investment form
var INVEST_OTHERS_SHOW = "INVEST_OTHERS_SHOW"; //show other people's investments for me to take

var kEX = angular.module("kExchange", ['ngRoute', 'ngCookies']);

kEX.config(function ($routeProvider, $httpProvider) {
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
        when('/login', {
            templateUrl: 'partials/login-part.html'
        }).
        when('/apps', {
            templateUrl: 'partials/apps-part.html'
        }).
        otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(function ($injector) {
        return {
            request: function (config) {
                var kexPofiles = $injector.get('kexPofiles');
                var auth = kexPofiles.getAuthToken();
                if (auth) {
                    config.headers['auth'] = auth;
                }
                return config;
            }
        };
    });
});
