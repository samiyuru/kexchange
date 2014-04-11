/**
 * Created by samiyuru on 4/10/14.
 */

kEX.controller("loanCtrl", function ($scope, kexInvest, kexPofiles) {
    var _curProfID = null;//currently loaded profile id
    var ui = {
        showInvestButt: true,
        isShowInvestors: false
    };
    var investors = [], loans = [];

    $scope.investors = investors;
    $scope.loans = loans;
    $scope.ui = ui;
    $scope.showInvestors = showInvestors;
    $scope.hideInvestors = hideInvestors;

    //--------------------------------------

    var Investment = kexInvest.Investment;

    var Investor = function () {
        this.ui = {
            isTake: false
        };
        Investment.apply(this, arguments);
    };

    Investor.prototype = new Investment();

    Investor.prototype.take = function () {
        kexInvest.takeLoan(this.id, (function (status) {
            if (status.success) {
                loans.unshift(new Loan(this.id
                    , this.amount
                    , this.date
                    , this.profit
                    , this.profitMod
                    , this.investor
                    , kexPofiles.getLoggedProf()));
                removeInvestment(this.id);
            }
            this.ui.isTake = false;//hide take it confirmation
        }).bind(this));
    };

    //--------------------------------------

    var Loan = function () {
        this.ui = {
            isPayback: false
        };
        Investment.apply(this, arguments);
    };

    Loan.prototype = new Investment();

    Loan.prototype.payBack = function () {
        kexInvest.payBack(this.id, (function (status) {
            if (status.success) {
                removeLoan(this.id);
            }
            this.ui.isPayback = false;//hide payback confirmation
        }).bind(this));
    };

    //----------------------------------

    loadLoans(kexPofiles.getCurrentProfpageID());//initial profile //loaded to profile or reload
    kexPofiles.onProfileChange(loadLoans);//profile change event
    loadInvestors();//initial profile //loaded to profile or reload

    //----------------------------------

    function showInvestors() {
        loadInvestors();
        ui.isShowInvestors = true;
    };

    function hideInvestors() {
        ui.isShowInvestors = false;
    };

    function removeInvestment(invstmntID) {
        var len = investors.length;
        for (var i = 0; i < len; i++) {
            if (investors[i].id == invstmntID) {
                investors.splice(i, 1);
                return;
            }
        }
    }

    function removeLoan(loanID) {
        var len = loans.length;
        for (var i = 0; i < len; i++) {
            if (loans[i].id == loanID) {
                loans.splice(i, 1);
                return;
            }
        }
    }

    function loadLoans(profID) {
        if (profID == kexPofiles.getLoggedProf()._id) {//if profile is logged in profile
            $scope.ui.showInvestButt = true;//show 'Need money' button
        } else {
            $scope.ui.showInvestButt = false;//hide 'Need money' button
        }
        if (_curProfID != profID) {
            kexInvest.loadLoans(profID, function loadInvestCB(status) {
                var docs = status.data;
                loans.length = 0;//clear existing loans
                var len = docs.length;
                for (var i = 0; i < len; i++) {
                    var doc = docs[i];
                    //id, amount, date, profit, profitMod, investor, debitor
                    var obj = new Loan(doc._id
                        , doc.amount
                        , new Date(doc.debitor.date)
                        , doc.profit.amount
                        , (doc.profit.change) ? doc.profit.change : null
                        , doc.investor.id
                        , kexPofiles.getLoggedProf());
                    loans.push(obj);
                }
                _curProfID = profID;
            });
        }
    }

    function loadInvestors() {
        kexInvest.loadInvestors(function loadInvestCB(status) {
            var docs = status.data;
            investors.length = 0;//clear existing investors
            var len = docs.length;
            for (var i = 0; i < len; i++) {
                var doc = docs[i];
                //id, amount, date, profit, profitMod, investor, debitor
                var obj = new Investor(doc._id
                    , doc.amount
                    , new Date(doc.investor.date)
                    , doc.profit.amount
                    , null
                    , doc.investor.id
                    , kexPofiles.getLoggedProf());
                investors.push(obj);
            }
        });
    }

});