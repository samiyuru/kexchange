/**
 * Created by samiyuru on 4/4/14.
 */

module.exports = function (db, accEvent) {

    var models = {};

    models.profileModel = require('./ProfileModel').initModel(db, accEvent);

    models.productModel = require('./ProductModel').initModel(db);

    models.investmentModel = require('./InvestmentModel').initModel(db);

    models.notificationModel = require('./NotificationModel').initModel(db);

    models.appsModel = require('./AppsModel').initModel(db);

    models.accountModel = require('./AccountModel').initModel(db, accEvent);

    return models;
}