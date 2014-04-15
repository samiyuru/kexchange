/**
 * Created by samiyuru on 4/15/14.
 */
kEX.service("kexInvest", function ($http, kexPofiles) {
    this.Investment = function (id, amount, date, profit, profitMod, investor, debitor) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.profit = profit;
        this.profitMod = profitMod;
        this.investor = investor;
        this.debitor = debitor;
    };

    this.loadMyInvestments = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + profID + "/investments"
        }).success(function (data) {
                cb(data);
            });
    };

    this.deleteInvest = function (invstmntID, cb) {
        $http({
            method: "DELETE",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/investments/" + invstmntID
        }).success(function (data) {
                cb(data);
            });
    };

    this.investMoney = function (investment, cb) {
        $http({
            method: "POST",
            params: {
                auth: kexPofiles.getAuthToken(),
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
                auth: kexPofiles.getAuthToken(),
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
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/investments"
        }).success(function (data) {
                cb(data);
            });
    };

    this.loadLoans = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + profID + "/moneytaken"
        }).success(function (data) {
                cb(data);
            });
    };

    this.payBack = function (invstmntID, cb) {
        $http({
            method: "PUT",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/investments/" + invstmntID + "/payback"
        }).success(function (data) {
                cb(data);
            });
    };

    this.takeLoan = function (invstmntID, cb) {
        $http({
            method: "PUT",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/investments/" + invstmntID + "/take"
        }).success(function (data) {
                cb(data);
            });
    };

});