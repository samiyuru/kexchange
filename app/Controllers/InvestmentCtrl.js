/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initCtrl = function (models) {

    var investmentModel = models.investmentModel;

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

        this.getMoneyTaken = function (profId, cb) {
            investmentModel.getMoneyTaken(profId, cb);
        }

        this.getInvestors = function (profID, cb) {
            investmentModel.getInvestors(profID, null, cb);
        }

        this.payBack = function (profID, invID, cb) {

        };

        this.takeLoan = function (profID, invID, cb) {
            
        };

    })();

};