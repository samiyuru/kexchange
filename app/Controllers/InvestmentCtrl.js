/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initCtrl = function(models){

    var investmentModel = models.investmentModel;

    return new (function(models){

        this.newInvestment = function(profId, amount, profit, cb){
            investmentModel.createInvestment(profId, amount, profit, cb);
        };

        this.investmentsOf = function(profId, cb){
            investmentModel.getInvestmentsOf(profId, cb);
        };

        this.rmInvestment = function(id, cb){
            investmentModel.rmInvestment(id, cb);
        };

    })();

};