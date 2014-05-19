/**
 * Created by samiyuru on 4/10/14.
 */

kEX.controller("loanCtrl", function ($scope, kexInvest, kexPofiles, kexEvent) {
    var ui = {
        isLoggedProfile: true,
        isTakeMoneyButt: true
    };
    var loans = [];
    var MyLoan = kexInvest.MyLoan;
    var OthersLoan = kexInvest.OthersLoan;

    var iInvestHndlr = {
        onInvestPayback: function (investment) {
            kexInvest.payBack(investment.id, function (status) {
                if (status.success) {
                    removeLoan(investment.id);
                }else {
                    alert(status.err);
                }
                investment.ui.isPayback = false;//hide payback confirmation
            });
        }
    };

    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        var profID = profile._id;
        var loggedProfId = kexPofiles.getLoggedProf()._id;
        if (profID == loggedProfId) {//if profile is logged in profile
            ui.isLoggedProfile = true;//show 'Need money' button, pay back
        } else {
            ui.isLoggedProfile = false;//hide 'Need money' button, pay back
        }
        kexInvest.loadLoans(profID, function loadInvestCB(status) {
            var docs = status.data;
            loans.length = 0;//clear existing loans
            var len = docs.length;
            for (var i = 0; i < len; i++) {
                var doc = docs[i];
                //id, amount, date, profit, profitMod, investor, debitor
                var obj = null;
                if (profID == loggedProfId) {
                    obj = new MyLoan(doc._id
                        , doc.amount
                        , new Date(doc.debitor.date)
                        , doc.profit.amount
                        , (doc.profit.change) ? doc.profit.change : null
                        , doc.investor.id
                        , kexPofiles.getLoggedProf());
                    obj.delegate = iInvestHndlr;
                } else {
                    obj = new OthersLoan(doc._id
                        , doc.amount
                        , new Date(doc.debitor.date)
                        , doc.profit.amount
                        , (doc.profit.change) ? doc.profit.change : null
                        , doc.investor.id
                        , kexPofiles.getLoggedProf());
                }
                loans.push(obj);
            }
        });
    });

    function removeLoan(investment) {
        var i = loans.indexOf(investment);
        loans.splice(i, 1);
    }

    function showInvestors() {
        kexEvent.pub(INVEST_OTHERS_SHOW, {
            onInvestTaken: function (investment) {
                var obj = new MyLoan(investment.id
                    , investment.amount
                    , investment.date
                    , investment.profit
                    , investment.profitMod
                    , investment.investor
                    , kexPofiles.getLoggedProf());
                obj.delegate = iInvestHndlr;
                loans.unshift(obj);
            },
            onInvestorsHide: function () {
                ui.isTakeMoneyButt = true;
            }
        });
        ui.isTakeMoneyButt = false;
    }

    $scope.loans = loans;
    $scope.ui = ui;
    $scope.showInvestors = showInvestors;
});


kEX.controller("investorsCtrl", function ($scope, kexInvest, kexPofiles, kexEvent) {

    var ui = {
        isShowInvestors: false
    };
    var iListner = null;
    var investors = [];
    var OthersInvestment = kexInvest.OthersInvestment;

    var iInvestmentHndl = {
        onInvestTake: function (investment) {
            kexInvest.takeLoan(investment.id, function (status) {
                if (status.success) {
                    iListner.onInvestTaken(investment);
                    removeInvestment(investment);
                }else {
                    alert(status.err);
                }
            });
        }
    }

    kexEvent.sub(INVEST_OTHERS_SHOW, hndlShowInvestors);
    loadInvestors();

    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        var profID = profile._id;
        if (profID != kexPofiles.getLoggedProf()._id) {
            ui.isShowInvestors = false;//if profile is not logged in profile
        }
    });

    function loadInvestors() {
        kexInvest.loadInvestors(function loadInvestCB(status) {
            var docs = status.data;
            investors.length = 0;//clear existing investors
            var len = docs.length;
            for (var i = 0; i < len; i++) {
                var doc = docs[i];
                //id, amount, date, profit, profitMod, investor, debitor
                var obj = new OthersInvestment(doc._id
                    , doc.amount
                    , new Date(doc.investor.date)
                    , doc.profit.amount
                    , null
                    , doc.investor.id
                    , kexPofiles.getLoggedProf());
                obj.delegate = iInvestmentHndl;
                investors.push(obj);
            }
        });
    }

    function removeInvestment(investment) {
        var i = investors.indexOf(investment);
        investors.splice(i, 1);
    }

    function hideInvestors() {
        ui.isShowInvestors = false;
        iListner.onInvestorsHide();
    }

    function hndlShowInvestors(_iListner) {
        iListner = _iListner;
        ui.isShowInvestors = true;
    }

    $scope.investors = investors;
    $scope.ui = ui;
    $scope.hideInvestors = hideInvestors;
    $scope.$on('$destroy', function () {
        kexEvent.unsub(INVEST_OTHERS_SHOW, hndlShowInvestors);
    });

});
