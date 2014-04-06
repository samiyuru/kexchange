/**
 * Created by samiyuru on 3/26/14.
 */

kEX.service("kexPofiles", function ($http) {

    var _loggedProf = {
        id: "0293200909"
    };

    var _limit = 5;
    var _skip = 0;
    var _isLoading = false;

    this.loadProfiles = function (cb) {
        if (!_isLoading) {
            $http({
                method: "GET",
                url: "/api/profiles",
                params: {
                    skip: _skip,
                    limit: _limit
                }
            }).success(function (data) {
                    cb(data);
                    _isLoading = false;
                }).error(function (data) {
                    _isLoading = false;
                });
        }
    };

    this.getLoggedProf = function () {
        return _loggedProf;
    };

    this.setLoggedProf = function (profile) {
        _loggedProf = profile;
    };

});

kEX.service("kexInvest", function ($http) {
    this.loadInvestments = function (profID, cb) {
        $http({
            method: "GET",
            url: "/api/profile/" + profID + "/investments"
        }).success(function (data) {
                cb(data);
            });
    };

    this.investMoney = function (investment, cb) {
        $http({
            method: "POST",
            params: {
                amount: investment.amount,
                profit: investment.profit
            },
            url: "/api/investments"
        }).success(function (data) {
                cb(data);
            });
    };


});