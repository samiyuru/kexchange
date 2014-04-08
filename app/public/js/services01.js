/**
 * Created by samiyuru on 3/26/14.
 */

kEX.service("kexPofiles", function ($http, $rootScope, $location) {

    var _loggedProf = {
        id: "53421bb56339790321ce19cf",
        shname: "Samiyuru b0fb7d3d",
        name: "Samiyuru Senarathne",
        wealth: 0,
        propic: "/propics/propic02.png"

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

    this.getCurrentProfPageID = function(){
        return _curProfPgID;
    }

    this.getLoggedProf = function () {
        return _loggedProf;
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
                _curProfPgID = this.getLoggedProf().id;
            } else if (urlPrts.length >= 2) {
                _curProfPgID = urlPrts[1];
            }
            execPrfChng(_curProfPgID);
        } else {
            _curProfPgID = null;//current page is not a profile page
        }
    }).bind(this));

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