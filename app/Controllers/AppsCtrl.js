/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");
var formidable = require('formidable');

module.exports.initCtrl = function (models) {

    var profileModel = models.profileModel;
    var appsModel = models.appsModel;

    var transTypes = require(__base + "/constants").accounts.transTypes;

    return new (function () {

        function isAdmin(req) {
            return true;
        }

        function isAppValid(appId, secret, cb) {
            appsModel.getAppById(appId, function (err, doc) {
                if (doc.secret == secret)
                    cb(doc);
                else
                    cb(null);
            });
            return true;
        };

        this.registerApp = function (req, res) {
            if (!isAdmin(req))
                return res.json(Utils.genResponse("Unauthorized"));
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var appData = fields;
                appsModel.registerApp(appData.name, appData.desc, appData.url, appData.iconUrl, function (err, doc) {
                    if (err)
                        return res.json(Utils.genResponse("error registering app"));
                    res.json(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.unRegisterApp = function (req, res) {
            if (!isAdmin(req))
                return res.json(Utils.genResponse("Unauthorized"));
            var appId = req.query.appid;
            appsModel.unregisterApp(appId, function (err, doc) {
                if (err)
                    return res.json(Utils.genResponse("error deleting app"));
                res.json(Utils.genResponse(null, true, doc));
            });
        };

        this.installApp = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var appId = req.params.appId;
            var userId = req.kexProfile.id;
            appsModel.installApp(userId, appId, function (err, numberAffected, rawResponse) {
                if (err || numberAffected < 1)
                    return res.json(Utils.genResponse("app installation failed"));
                res.json(Utils.genResponse(null, true));
            });
        };

        this.uninstallApp = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var appId = req.params.appId;
            var userId = req.kexProfile.id;
            appsModel.uninstallApp(userId, appId, function (err, numberAffected, rawResponse) {
                if (err || numberAffected < 1)
                    return res.json(Utils.genResponse("app uninstallation failed"));
                res.json(Utils.genResponse(null, true));
            });
        };

        this.moneyTransfer = function (req, res) {
            var appId = req.params.appId;
            var appKey = req.query.key;
            var detail = req.query.detail;
            var batchId = req.query.batch;//uuid identifies a set of people receive money for single purpose
            isAppValid(appId, appKey, function (app) {
                if (!app)
                    return res.json(Utils.genResponse("Unauthorized"));
                var transInfo = {
                    type: transTypes.APP_PROFIT,
                    object: {
                        app: app.name,
                        detail: detail,
                        batchId: batchId
                    }
                };
                profileModel.putMoney(doc.investor.id.toString(), doc.amount, transInfo, function moneyGive(success) {
                    if (!success)
                        return res.json(Utils.genResponse("failed to restore money"));
                    res.json(Utils.genResponse(null, true));
                });
            });
        };

        this.getUsers = function (req, res) {
            var appId = req.params.appId;
            var appKey = req.query.key;
            isAppValid(appId, appKey, function (app) {
                if (!app)
                    return res.json(Utils.genResponse("Unauthorized"));
                appsModel.getUsersOf(appId, function (users) {
                    if (!users)
                        return res.json(Utils.genResponse("user retrieval failed"));
                    res.json(Utils.genResponse(null, true, users));
                });
            });
        };

        this.getAppsAdmin = function (req, res) {//get apps list as admin
            if (!isAdmin(req))
                return res.json(Utils.genResponse("Unauthorized"));
            appsModel.getAppsAdmin(function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("could not get app list"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };


        this.getAppsUser = function (req, res) {//get apps list as user
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            appsModel.getAppsUser(req.kexProfile.id, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("could not get app list"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.getInstalledApps = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            appsModel.getInstalledApps(req.params.id, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("could not get the installed app list"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

    })();

};