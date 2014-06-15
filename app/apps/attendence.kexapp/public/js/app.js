/**
 * Created by samiyuru on 6/2/14.
 */

var attApp = angular.module("attApp", []);

attApp.controller("userCtrl", function ($scope) {

    var users = [
        {
            name: "samiyuru senarathne",
            selected: false
        },
        {
            name: "samiyuru senarathne",
            selected: false
        },
        {
            name: "samiyuru senarathne",
            selected: false
        },
        {
            name: "samiyuru senarathne",
            selected: false
        }
    ];

    $scope.users = users;

});