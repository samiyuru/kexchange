/**
 * Created by samiyuru on 4/10/14.
 */

kEX.controller("myInvestCtrl", function ($scope, kexInvest, kexPofiles) {

    $scope.ui = ui = {
        isShowNwInvest: false,
        showInvestButt: true
    };

    var _curProfID = null;//currently loaded profile id
    var investments;
    $scope.investments = investments = [];

    $scope.newInvest = newInvest = {
        amount: "",
        profit: ""
    };

    //----------------------------------

    loadMyInvestments(kexPofiles.getCurrentProfpageID());//initial profile //loaded to profile or reload
    kexPofiles.onProfileChange(loadMyInvestments);//profile change event

    //----------------------------------

    var Investment = function (id, amount, date, profit, profitMod, investor, debitor) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.profit = profit;
        this.profitMod = profitMod;
        this.investor = investor;
        this.debitor = debitor;
        this.ui = {
            isPrftMod: false,
            isRmv: false,
            modPrft: ""
        };
    };

    Investment.prototype.modProfit = function (newProft) {
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
            this.ui.isPrftMod = false;//hide profit mod inputs
            this.ui.modPrft = "";//clear mod input
        }).bind(this));
    }

    Investment.prototype.delete = function () {
        kexInvest.deleteInvest(this.id, function (status) {
            var data = status.data;
            deleteInv(data._id);
        });
    }

    //----------------------------------

    function convertDocToInv(doc) {
        var debitor = null, dispDate;
        if (doc.debitor) {
            var _debitor = doc.debitor.id
            debitor = {
                name: _debitor.name,
                shname: _debitor.nickname,
                propic: _debitor.propic,
                id: _debitor._id
            }
            dispDate = new Date(doc.debitor.date)
        } else {
            dispDate = new Date(doc.investor.date)
        }
        var profitMod = null;
        if (doc.profit.change) {
            var _change = doc.profit.change;
            profitMod = {
                profit: _change.profit,
                date: new Date(_change.date)//in effect after this date
            };
        }
        var invObj = new Investment(doc._id, doc.amount, dispDate, doc.profit.amount, profitMod, kexPofiles.getLoggedProf(), debitor);
        return invObj;
    }

    function loadMyInvestments(profID) {
        if (profID == kexPofiles.getLoggedProf().id) {//if profile is logged in profile
            $scope.ui.showInvestButt = true;//show 'Need money' button
        } else {
            $scope.ui.showInvestButt = false;//hide 'Need money' button
        }
        if (_curProfID != profID) {
            investments.length = 0;//clear existing investments
            kexInvest.loadMyInvestments(profID, function loadInvestCB(status) {
                var data = status.data;
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var obj = convertDocToInv(data[i]);
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

    $scope.investMoney = function () {
        kexInvest.investMoney(newInvest, function newInvestCB(status) {//data format from server is different from normal investment format
            var data = status.data;
            var invObj = new Investment(data._id, data.amount, new Date(), data.profit, null, kexPofiles.getLoggedProf(), null);
            investments.unshift(invObj);
        });
        hideNewInvest();
    };

    function deleteInv(invID) {
        var len = investments.length;
        for (var i = 0; i < len; i++) {
            if (investments[i].id == invID) {
                investments.splice(i, 1);
                return;
            }
        }
    }

});