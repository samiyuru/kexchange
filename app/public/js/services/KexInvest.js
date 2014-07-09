/**
 * Created by samiyuru on 4/15/14.
 */
kEX.service("kexInvest", function ($http, kexPofiles, kexInvestTypes) {

    this.InvestmentBase = kexInvestTypes.InvestmentBase;
    this.MyInvestment = kexInvestTypes.MyInvestment;
    this.OthersInvestment = kexInvestTypes.OthersInvestment;
    this.MyLoan = kexInvestTypes.MyLoan;
    this.OthersLoan = kexInvestTypes.OthersLoan;

    this.loadInvestmentsOf = function (profID, cb) {
        $http({
            method: "GET",
            url: "/api/profile/" + profID + "/investments"
        }).success(function (data) {
                cb(data);
            });
    };

    this.deleteInvest = function (invstmntID, cb) {
        $http({
            method: "DELETE",
            url: "/api/investments/" + invstmntID
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

    this.modProfit = function (invstmntID, newProft, cb) {
        $http({
            method: "PUT",
            params: {
                profit: newProft
            },
            url: "/api/investments/" + invstmntID + "/profit"
        }).success(function (data) {
                cb(data);
            });
    };

    this.loadInvestors = function (cb) {
        $http({
            method: "GET",
            url: "/api/investments"
        }).success(function (data) {
                cb(data);
            });
    };

    this.loadLoans = function (profID, cb) {
        $http({
            method: "GET",
            url: "/api/profile/" + profID + "/moneytaken"
        }).success(function (data) {
                cb(data);
            });
    };

    this.payBack = function (invstmntID, cb) {
        $http({
            method: "PUT",
            url: "/api/investments/" + invstmntID + "/payback"
        }).success(function (data) {
                cb(data);
            });
    };

    this.takeLoan = function (invstmntID, cb) {
        $http({
            method: "PUT",
            url: "/api/investments/" + invstmntID + "/take"
        }).success(function (data) {
                cb(data);
            });
    };

});