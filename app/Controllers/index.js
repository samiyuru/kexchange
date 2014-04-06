/**
 * Created by samiyuru on 4/6/14.
 */

module.exports = function(models){

    var ctrls =  {};

    ctrls.investmentCtrl = require('./InvestmentCtrl').initCtrl(models);

    ctrls.pluginCtrl = require('./PluginCtrl').initCtrl(models);

    ctrls.productCtrl = require('./ProductCtrl').initCtrl(models);

    ctrls.productCtrl = require('./ProductCtrl').initCtrl(models);

    ctrls.profileCtrl = require('./ProfileCtrl').initCtrl(models);

    return ctrls;
}