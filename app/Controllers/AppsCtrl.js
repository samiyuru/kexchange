/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initCtrl = function (models) {

    var profileModel = models.profileModel;
    var appsModel = models.appsModel;

    var transTypes = require(__base + "/constants").accounts.transTypes;

    return new (function () {

        function isAdmin(req) {
            return true;
        }

        function isAppValid(req) {
            return true;
        }

        this.registerApp = function (req, res) {
            if (!isAdmin(req))
                return res.json({});
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var appData = fields;
                appsModel.registerApp(appData.name, appData.desc, appData.url, appData.iconUrl, function (err, doc) {
                    if (err)
                        return res.json(Utils.genResponse("error registering app"));
                    res.json(Utils.genResponse(null, true, doc));
                });
            });
        }

        this.unRegisterApp = function (req, res) {
            if (!isAdmin(req))
                return res.json({});
            var appId = req.query.appid;
            appsModel.unregisterApp(appId, function (err, doc) {
                if (err)
                    return res.json(Utils.genResponse("error deleting app"));
                res.json(Utils.genResponse(null, true, doc));
            });
        }

        this.installApp = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var appId = req.params.appId;
            var userId = req.kexProfile.id;
            appsModel.installApp(userId, appId, function (err, numberAffected, rawResponse) {
                if (err || numberAffected < 1)
                    return res.json(Utils.genResponse("app installation failed"));
                res.json(Utils.genResponse(null, true));
            });
        }

        this.uninstallApp = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var appId = req.params.appId;
            var userId = req.kexProfile.id;
            appsModel.uninstallApp(userId, appId, function (err, numberAffected, rawResponse) {
                if (err || numberAffected < 1)
                    return res.json(Utils.genResponse("app uninstallation failed"));
                res.json(Utils.genResponse(null, true));
            });
        }

        this.moneyTransfer = function (req, res) {
            if (!isAppValid(req))
                return res.json({});
            var detail = req.query.detail;
            var transInfo = {
                type: transTypes.APP_PROFIT,
                object: {
                    app: "",
                    detail: detail
                }
            };
            profileModel.putMoney(doc.investor.id.toString(), doc.amount, transInfo, function moneyGive(success) {
                if (!success)
                    return res.json(Utils.genResponse("failed to restore money"));
                res.json(Utils.genResponse(null, true, doc));
            });
        }

        this.getUsers = function (req, res) {
            if (!isAppValid(req))
                return res.json({});
            var appId = req.params.appId;
            appsModel.getUsersOf(appId, function (users) {
                if (!users)
                    return res.json(Utils.genResponse("user retrieval failed"));
                res.json(Utils.genResponse(null, true, users));
            });
        }

    })();

};