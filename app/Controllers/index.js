/**
 * Created by samiyuru on 4/6/14.
 */

module.exports = function(models, agenda){

    var ctrls =  {};

    ctrls.investmentCtrl = require('./InvestmentCtrl').initCtrl(models, agenda);

    ctrls.appsCtrl = require('./AppsCtrl').initCtrl(models);

    ctrls.productCtrl = require('./ProductCtrl').initCtrl(models, agenda);

    ctrls.profileCtrl = require('./ProfileCtrl').initCtrl(models, agenda);

    ctrls.adminCtrl = require('./AdminCtrl').initCtrl(models, agenda);

    return ctrls;
}