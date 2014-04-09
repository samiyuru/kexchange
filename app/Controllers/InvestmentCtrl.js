/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initCtrl = function (models) {

    var investmentModel = models.investmentModel;
    var profileModel = models.profileModel;

    return new (function (models) {

        this.newInvestment = function (profId, amount, profit, cb) {
            investmentModel.createInvestment(profId, amount, profit, cb);
        };

        this.investmentsOf = function (profId, cb) {
            investmentModel.getInvestmentsOf(profId, cb);
        };

        this.rmInvestment = function (profId, invID, cb) {
            investmentModel.rmInvestment(profId, invID, cb);
        };

        this.changeProfit = function (profId, invId, newProfit, cb) {
            investmentModel.changeProfit(profId, invId, newProfit, cb);
        };

        this.getLoans = function (profId, cb) {
            investmentModel.getLoans(profId, cb);
        }

        this.getInvestors = function (profID, cb) {
            investmentModel.getInvestors(profID, null, cb);
        }

        this.payBack = function (profID, invID, cb) {
            investmentModel.getInvestmentById(invID, function getInvCB(err, doc) {
                if (err || doc == null) {
                    cb({err: "invalid investment ID"});
                    return;
                }
                if (!(doc.debitor.id.toString() == profID)) {
                    cb({err: "invalid payback"});
                    return;
                }
                profileModel.getMoney(profID, doc.amount, function moneyGetCB(amount) {
                    if (amount != doc.amount) {
                        cb({err: "money retrieval error"});
                        return;
                    }
                    profileModel.putMoney(doc.investor.id, amount, function moneyGive(success) {
                        if (!success) {
                            cb({err: "money transfer error"});
                            return;
                        }
                        investmentModel.rmInvestmentById(invID, function removeInv(err, doc) {
                            if (!err) {
                                cb({err: "Investment could not remove"});
                                return;
                            }
                            cb({err: null, success: true});
                        });
                    });
                });
            });
        };

        this.takeLoan = function (profID, invID, cb) {

        };

    })();

};