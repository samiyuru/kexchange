/**
 * Created by samiyuru on 4/4/14.
 */
var formidable = require('formidable');
var Utils = require(__base + "/utils");

module.exports.initCtrl = function (models) {

    var profileModel = models.profileModel;
    var authModel = models.authModel;
    var accModel = models.accountModel;

    agenda.every('10 minutes', 'updateLastWealth');

    return new (function () {

        this.createProfile = function (profile, password, cb) {
            profileModel.createProfile(profile, function (err, doc) {
                if (err)
                    return cb(Utils.genResponse("profile creation error"));
                authModel.createAuth(doc, password, function (err, doc) {
                    if (err)
                        return cb(Utils.genResponse("profile auth creation error"));
                    cb(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.validateAuth = function (authToken, cb) {
            authModel.validateToken(authToken, cb);
        }

        this.authorize = function (req, res) {
            if (req.kexProfile) {
                res.json(Utils.genResponse(null, true, req.kexProfile));
            } else {
                res.json(Utils.genResponse("Unauthorized"));
            }
        }

        this.getAuthToken = function (req, res) {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var user = fields.user,
                    pass = fields.pass,
                    kexProfile = req.kexProfile;
                authModel.getAuthToken(user, pass, function (err, doc) {
                    if (err)
                        return res.json(Utils.genResponse("auth token retrieval error"));
                    if (!doc)
                        return res.json(Utils.genResponse("Invalid username/password"));
                    res.json(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.peopleByWealth = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var skip = req.query.skip, limit = req.query.limit;
            profileModel.getProfiles({
                skip: skip,
                limit: limit
            }, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("profile retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.getProfile = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var profID = req.params.id;
            profileModel.getProfile(profID, function (err, doc) {
                if (err || !doc)
                    return res.json(Utils.genResponse("profile retrieval error"));
                res.json(Utils.genResponse(null, true, doc));
            });
        };

        this.getAccounts = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var profID = req.params.id;
            accModel.getTransactions(profID, null, function (err, docs) {
                if (err)
                    return  res.json(Utils.genResponse("could not get transactions"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        agenda.define('updateLastWealth', function (job, done) {
            profileModel.getAllProfiles(function (err, docs) {
                if (err)return console.warn("couldnot fetch accounts for last profit calculation");
                var pL = docs.length;
                for (var i = 0; i < pL; i++) {
                    var profile = docs[i];
                    profile.lastwealth = profile.wealth;
                    profile.save();
                }
            });
        });

    })();

};