/**
 * Created by samiyuru on 6/2/14.
 */

var attApp = angular.module("attApp", []);

attApp.controller("userCtrl", function ($scope, $http) {

    var ui = {
        selecCnt: 0,
        onlySelec: false,
        eventName: "",
        amount: 0
    };
    var users = [];
    var usersDic = {};

    (function () {
        $http({
            method: "GET",
            url: "/users"
        }).success(function (status) {
            if (status.success) {
                var _users = status.data;
                for (var i = 0; i < _users.length; i++) {
                    var user = _users[i];
                    user.selected = false;
                    users.push(user);
                    usersDic[users._id] = user;
                }
            } else {
                alert(status.err);
            }
        });
    })();

    function userChkChng(user) {
        if (user.selected) {
            user.selected = false;
            ui.selecCnt--;
        } else {
            user.selected = true;
            ui.selecCnt++;
        }
    }

    function payUsers() {
        var body = {
            amount: ui.amount,
            detail: ui.detail,
            users: []
        };
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.selected) {
                body.users.push(user._id);
            }
        }
        if (body.users.length == 0) {
            alert('Please select at least one user');
            return;
        }
        $http({
            method: "post",
            url: "/pay",
            data: body,
            headers: {
                'Content-type': 'application/json'
            }
        }).success(function (status) {
            ui.amount = 0;
            ui.detail = '';
            var data = status.data;
            var nonPayed = data.nonpayed;
            var nonPayedNames = '';
            for (var i in nonPayed) {
                nonPayedNames += (((!nonPayedNames) ? ', ' : '') + nonPayed[i].name);
            }
            if (status.success) {
                alert('All selected users were payed ' + body.amount + 'K$ except : ' + ((nonPayed.length === 0) ? 'none' : nonPayedNames));
            } else {
                alert(status.err);
            }
        });
    }

    $scope.users = users;
    $scope.userChkChng = userChkChng;
    $scope.payUsers = payUsers;
    $scope.ui = ui;

});