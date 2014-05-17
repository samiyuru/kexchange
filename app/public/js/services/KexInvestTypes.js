/**
 * Created by samiyuru on 5/15/14.
 */

kEX.service("kexInvestTypes", function (kexPofiles) {

    var InvestmentBase = function (id, amount, date, profit, profitMod, investor, debitor) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.profit = profit;
        this.profitMod = profitMod;
        this.investor = investor;
        this.debitor = debitor;
        this.delegate = null;
    };

    //--------------------------------------

    var OthersInvestment = function () {
        InvestmentBase.apply(this, arguments);
        this.ui = {
            isTake: false,
            TakeItCnf: false
        };
    };

    OthersInvestment.prototype = Object.create(InvestmentBase.prototype);

    OthersInvestment.prototype.take = function () {
        this.delegate.onInvestTake(this);
    };

    OthersInvestment.prototype.showTakeConfirm = function () {
        this.ui.TakeItCnf = true;
    };

    OthersInvestment.prototype.hideTakeConfirm = function () {
        this.ui.TakeItCnf = false;
    };

    //--------------------------------------

    var MyLoan = function () {
        InvestmentBase.apply(this, arguments);
        this.ui = {
            payBkCnf: false
        };
    };

    MyLoan.prototype = Object.create(InvestmentBase.prototype);

    MyLoan.prototype.showPayBackConfirm = function () {
        this.ui.payBkCnf = true;
    };

    MyLoan.prototype.hidePayBackConfirm = function () {
        this.ui.payBkCnf = false;
    };

    MyLoan.prototype.payBack = function () {
        this.delegate.onInvestPayback(this);
    };

    //--------------------------------------

    var OthersLoan = function () {
        InvestmentBase.apply(this, arguments);
    };

    OthersLoan.prototype = Object.create(InvestmentBase.prototype);

    //--------------------------------------

    var MyInvestment = function () {
        InvestmentBase.apply(this, arguments);
        this.ui = {
            isPrftModVw: false,
            delConf: false
        };
        this.newProft = "";
    };

    MyInvestment.prototype = Object.create(InvestmentBase.prototype);

    MyInvestment.prototype.modProfit = function () {
        this.delegate.onProfitChange(this, this.newProft);
    }

    MyInvestment.prototype.showDel = function () {
        this.ui.delConf = true;
    };

    MyInvestment.prototype.hideDel = function () {
        this.ui.delConf = false;
    };

    MyInvestment.prototype.showProfitMod = function () {
        this.ui.isPrftModVw = true;
    };

    MyInvestment.prototype.hideProfitMod = function () {
        this.ui.isPrftModVw = false;
        this.newProft = "";
    };

    MyInvestment.prototype.resetProfitMod = function () {
        this.hideProfitMod();//hide profit mod inputs
        this.newProft = "";//clear mod input
    };

    MyInvestment.prototype.delete = function () {
        this.delegate.onInvestDelete(this);
    }

    this.InvestmentBase = InvestmentBase;
    this.MyInvestment = MyInvestment;
    this.OthersInvestment = OthersInvestment;
    this.MyLoan = MyLoan;
    this.OthersLoan = OthersLoan;

});