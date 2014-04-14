/**
 * Created by samiyuru on 3/26/14.
 */

kEX.service("kexPofiles", function ($http, $rootScope, $location) {

    var _loggedProf = {
        _id: "5346c20b043432d32a7e65b2",
        nickname: "Samiyuru b0fb7d3d",
        name: "Samiyuru Senarathne",
        wealth: 0,
        propic: "/propics/propic01.png"

    };
    var _curProfPgID; // currently shown profile page id

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

    this.getCurrentProfpageID = function () {
        return _curProfPgID;
    }

    this.getLoggedProf = function () {
        return _loggedProf;
    };

    this.getAuthToken = function () {
        return _loggedProf._id;
    };

    this.setLoggedProf = function (profile) {
        _loggedProf = profile;
    };

    //----------------------------------------

    var _onPrfChngArr = [];//on profile change listners
    this.onProfileChange = function (func) {
        _onPrfChngArr.push(func);
    };

    $rootScope.$on('$locationChangeSuccess', (function () {
        function execPrfChng(profID) {
            var len = _onPrfChngArr.length;
            for (var i = 0; i < len; i++) {
                (_onPrfChngArr[i])(profID);
            }
        };

        var urlPrts = $location.url().substr(1).split('/');
        if (urlPrts[0] == 'profile') { //url should be like /profile/32324234wfsdfsd or /profile
            if (urlPrts.length == 1) {
                _curProfPgID = this.getLoggedProf()._id;
            } else if (urlPrts.length >= 2) {
                _curProfPgID = urlPrts[1];
            }
            execPrfChng(_curProfPgID);
        } else {
            _curProfPgID = null;//current page is not a profile page
        }
    }).bind(this));

});

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

kEX.service("kexProducts", function ($http, kexPofiles) {

    this.createProduct = function (isAuction, type, name, detail, qty, price, expire, imgs, cb) {
        var formData = new FormData();
        formData.append("type", type);
        formData.append("name", name);
        formData.append("detail", detail);
        formData.append("qty", qty);
        formData.append("price", price);
        formData.append("expire", expire);
        var imgLen = imgs.length;
        for (var i = 0; i < imgLen; i++) {
            formData.append("img_" + i, imgs[i]);
        }
        $http({
            method: "POST",
            params: {
                auth: kexPofiles.getAuthToken(),
                isauction: (isAuction) ? 1 : 0
            },
            data: formData,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity,
            url: "/api/products/"
        }).success(function (data) {
                cb(data);
            });
    }

});