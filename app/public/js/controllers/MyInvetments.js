/**
 * Created by samiyuru on 4/10/14.
 */

kEX.controller("myInvestCtrl", function ($scope, kexInvest, kexPofiles, kexEvent) {

    var ui = {
        isLoggedProfile: true,
        isNewInvestButt: true,
        myProfId: kexPofiles.getLoggedProf()._id//for profile link in ui
    };
    var investments = [];
    var MyInvestment = kexInvest.MyInvestment;
    var OthersInvestment = kexInvest.OthersInvestment;

    var iInvestmentHndl = {
        onInvestDelete: function (investment) {
            kexInvest.deleteInvest(investment.id, function (status) {
                var data = status.data;
                removeInvestment(investment);
            });
        },
        onInvestTake: function (investment) {
            kexInvest.takeLoan(investment.id, function (status) {
                if (status.success) {
                    removeInvestment(investment)
                }
                investment.hideTakeConfirm();
            });
        },
        onProfitChange: function (investment, newProft) {
            kexInvest.modProfit(investment.id, newProft, function (status) {
                var doc = status.data;
                if (!doc.profit.change) {
                    investment.profitMod = null;
                    investment.profit = doc.profit.amount;
                } else {
                    investment.profitMod = {
                        profit: doc.profit.change.profit,
                        date: new Date(doc.profit.change.date)//in effect after this date
                    };
                }
                investment.resetProfitMod();
                investment.hideProfitMod();
            });
        }
    };

    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        var profID = profile._id;
        var loggedProfId = kexPofiles.getLoggedProf()._id;
        if (profID == loggedProfId) {//if profile is logged in profile
            ui.isLoggedProfile = true;//hide close, modProfit,
        } else {
            ui.isLoggedProfile = false;
        }
        investments.length = 0;//clear existing investments
        kexInvest.loadInvestmentsOf(profID, function loadInvestCB(status) {
            var data = status.data;
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var doc = data[i];
                var obj = null;
                if (profID == loggedProfId) {
                    obj = new MyInvestment(doc._id
                        , doc.amount
                        , (doc.debitor) ? (new Date(doc.debitor.date)) : (new Date(doc.investor.date))
                        , doc.profit.amount
                        , (doc.profit.change) ? doc.profit.change : null
                        , doc.investor.id
                        , (doc.debitor) ? doc.debitor.id : null);
                } else {
                    obj = new OthersInvestment(doc._id
                        , doc.amount
                        , (doc.debitor) ? (new Date(doc.debitor.date)) : (new Date(doc.investor.date))
                        , doc.profit.amount
                        , (doc.profit.change) ? doc.profit.change : null
                        , doc.investor.id
                        , (doc.debitor) ? doc.debitor.id : null);
                }
                obj.delegate = iInvestmentHndl;
                investments.push(obj);
            }
        });
    });

    function removeInvestment(investment) {
        var i = investments.indexOf(investment);
        investments.splice(i, 1);
    }

    function showNewInvest() {
        ui.isNewInvestButt = false;//hide new invest button
        kexEvent.pub(INVEST_NEW_SHOW, {
            onNewInvestment: function (data) {
                if (ui.isLoggedProfile) {
                    var invObj = new MyInvestment(data._id
                        , data.amount
                        , new Date()
                        , data.profit
                        , null
                        , kexPofiles.getLoggedProf()
                        , null);
                    invObj.delegate = iInvestmentHndl;
                    investments.unshift(invObj);
                }
            },
            onHideInvestForm: function () {
                if (ui.isLoggedProfile) {
                    ui.isNewInvestButt = true;//show new invest button
                }
            }
        });
    }

    $scope.ui = ui;
    $scope.investments = investments;
    $scope.showNewInvest = showNewInvest;
});

kEX.controller("newInvestCtrl", function ($scope, kexInvest, kexPofiles, kexEvent) {
    var newInvest = {
        amount: "",
        profit: ""
    };
    var ui = {
        isShowNwInvest: false,
        myProfId: kexPofiles.getLoggedProf()._id//for profile link in ui
    };
    var ilistner = null;

    kexEvent.sub(INVEST_NEW_SHOW, hndlShowForm);

    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        var profID = profile._id;
        if (profID != kexPofiles.getLoggedProf()._id) {
            ui.isShowNwInvest = false;//if profile is not logged in profile
        }
    });

    function hideNewInvest() {
        newInvest.amount = "";
        newInvest.profit = "";
        ui.isShowNwInvest = false;
        if (ilistner)ilistner.onHideInvestForm();
    }

    function investMoney() {
        kexInvest.investMoney(newInvest, function newInvestCB(status) {//data format from server is different from normal MyInvestment format
            var data = status.data;
            if (ilistner)ilistner.onNewInvestment(data);
            hideNewInvest();
        });
    };

    function hndlShowForm(_ilistner) {
        ilistner = _ilistner;
        ui.isShowNwInvest = true;
    }

    $scope.newInvest = newInvest;
    $scope.investMoney = investMoney;
    $scope.hideNewInvest = hideNewInvest;
    $scope.ui = ui;
    $scope.$on('$destroy', function () {
        kexEvent.unsub(INVEST_NEW_SHOW, hndlShowForm);
    });

});
