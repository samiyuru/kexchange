/**
 * Created by samiyuru on 4/10/14.
 */

kEX.controller("myInvestCtrl", function ($scope, kexInvest, kexPofiles) {

    var ui = {
        isShowNwInvest: false,
        showInvestButt: true
    };

    var _curProfID = null;//currently loaded profile id

    var investments = [];

    var newInvest = {
        amount: "",
        profit: ""
    };

    $scope.ui = ui;
    $scope.newInvest = newInvest;
    $scope.investments = investments;
    $scope.investMoney = investMoney;
    $scope.hideNewInvest = hideNewInvest;

    //----------------------------------

    var Investment = kexInvest.Investment;

    var MyInvestment = function () {
        this.ui = {
            isPrftMod: false,
            isRmv: false,
            modPrft: ""
        };
        Investment.apply(this, arguments);
    };

    MyInvestment.prototype = new Investment();

    MyInvestment.prototype.modProfit = function (newProft) {
        kexInvest.modProfit(this.id, newProft, (function (status) {
            var doc = status.data;
            if (!doc.profit.change) {
                this.profitMod = null;
                this.profit = doc.profit.amount;
            } else {
                this.profitMod = {
                    profit: doc.profit.change.profit,
                    date: new Date(doc.profit.change.date)//in effect after this date
                };
            }
            this.resetProfitMod();
        }).bind(this));
    }

    MyInvestment.prototype.showDel = function () {
        this.ui.isRmv = true;
    };

    MyInvestment.prototype.hideDel = function () {
        this.ui.isRmv = false;
    };

    MyInvestment.prototype.showProfitMod = function () {
        this.ui.isPrftMod = true;
    };

    MyInvestment.prototype.hideProfitMod = function () {
        this.ui.isPrftMod = false;
        this.ui.modPrft = "";
    };

    MyInvestment.prototype.resetProfitMod = function () {
        this.hideProfitMod();//hide profit mod inputs
        this.ui.modPrft = "";//clear mod input
    };

    MyInvestment.prototype.delete = function () {
        kexInvest.deleteInvest(this.id, function (status) {
            var data = status.data;
            deleteInv(data._id);
        });
    }

    //----------------------------------

    loadMyInvestments(kexPofiles.getCurrentProfpageID());//initial profile //loaded to profile or reload
    kexPofiles.onProfileChange(loadMyInvestments);//profile change event

    //----------------------------------

    function loadMyInvestments(profID) {
        if (profID == kexPofiles.getLoggedProf()._id) {//if profile is logged in profile
            ui.showInvestButt = true;//show 'Need money' button
        } else {
            ui.showInvestButt = false;//hide 'Need money' button
        }
        if (_curProfID != profID) {
            investments.length = 0;//clear existing investments
            kexInvest.loadMyInvestments(profID, function loadInvestCB(status) {
                var data = status.data;
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var doc = data[i];
                    var obj = new MyInvestment(doc._id
                        , doc.amount
                        , (doc.debitor) ? (new Date(doc.debitor.date)) : (new Date(doc.investor.date))
                        , doc.profit.amount
                        , (doc.profit.change) ? doc.profit.change : null
                        , kexPofiles.getLoggedProf()
                        , (doc.debitor) ? doc.debitor.id : null);
                    investments.push(obj);
                }
                _curProfID = profID;
            });
        }
    }

    function hideNewInvest() {
        newInvest.amount = "";
        newInvest.profit = "";
        ui.isShowNwInvest = false;
    }

    function investMoney() {
        kexInvest.investMoney(newInvest, function newInvestCB(status) {//data format from server is different from normal MyInvestment format
            var data = status.data;
            var invObj = new MyInvestment(data._id, data.amount, new Date(), data.profit, null, kexPofiles.getLoggedProf(), null);
            investments.unshift(invObj);
        });
        hideNewInvest();
    };

    function deleteInv(invstmntID) {
        var len = investments.length;
        for (var i = 0; i < len; i++) {
            if (investments[i].id == invstmntID) {
                investments.splice(i, 1);
                return;
            }
        }
    }

});