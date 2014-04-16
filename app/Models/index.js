/**
 * Created by samiyuru on 4/4/14.
 */

module.exports = function (db) {

    var models = {};

    models.profileModel = require('./ProfileModel').initModel(db);

    models.productModel = require('./ProductModel').initModel(db);

    models.investmentModel = require('./InvestmentModel').initModel(db);

    models.notificationModel = require('./NotificationModel').initModel(db);

    models.pluginModel = require('./PluginModel').initModel(db);

    models.accountModel = require('./AccountModel').initModel(db);

    models.authModel = require('./AuthModel').initModel(db);

    return models;
}