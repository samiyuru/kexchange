/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");
var formidable = require('formidable');
var uuid = require('node-uuid');

module.exports.initCtrl = function (models) {

    var profileModel = models.profileModel;
    var appsModel = models.appsModel;
    var accModel = models.accountModel;

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
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var appId = req.params.appId;
                var appKey = req.headers.secret;
                var detail = fields.detail;
                var amount = fields.amount;
                var users = fields.users;
                var batchId = uuid.v4();//uuid identifies a set of people receive money for single purpose
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
                    var cbCount = 0;
                    var respData = {
                        payed: [], nonpayed: []
                    };
                    var uL = users.length;
                    for (var i = 0; i < uL; i++) {
                        var user = users[i];
                        profileModel.putMoney(user, amount, transInfo, function moneyGive(success) {
                            if (!success) {
                                respData.nonpayed.push(user);
                            } else {
                                respData.payed.push(user);
                            }
                            cbCount++;
                            if (cbCount >= uL) {
                                res.json(Utils.genResponse(null, true, respData));
                            }
                        });
                    }
                });
            });
        };

        this.getUsers = function (req, res) {
            var appId = req.params.appId;
            var appKey = req.headers.secret;
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

        this.getUserEarnings = function(req, res){
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.params.id;
            accModel.getAppUserEarnings({
                skip: 0,
                limit: 50
            }, function (err, docs) {
                if (err)
                    return  res.json(Utils.genResponse("could not get transactions"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

    })();

};