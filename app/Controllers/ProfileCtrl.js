/**
 * Created by samiyuru on 4/4/14.
 */
var formidable = require('formidable');
var Utils = require(__base + "/utils");
var request = require('request');

module.exports.initCtrl = function (models, agenda) {

    var profileModel = models.profileModel;
    var accModel = models.accountModel;

    var FB_URL = 'https://graph.facebook.com/me';

    agenda.every('5 minutes', 'updateLastWealth');

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

        this.createProfileFB = function (req, res) {
            function genRespObj(doc) {
                doc = doc.toObject();
                var authToken = doc.apikey;
                delete doc.apikey;
                var profile = doc;
                return {
                    profile: profile,
                    authToken: authToken
                };
            }

            var token = req.query.token;
            request({
                method: 'get',
                url: FB_URL,
                json: true,
                qs: {
                    access_token: token
                }
            }, function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    profileModel.getProfileByEmail(body.email, true, function (err, doc) {
                        if (err)
                            return res.json(Utils.genResponse("profile creation error"));
                        if (doc) {
                            res.json(Utils.genResponse(null, true, genRespObj(doc)));
                        } else {
                            profileModel.createProfile({
                                nickname: body.first_name,
                                email: body.email,
                                name: body.first_name + ' ' + body.last_name,
                                lastwealth: 0,
                                wealth: 10000,
                                propic: 'http://graph.facebook.com/' + body.id + '/picture?height=70&type=normal&width=70'
                            }, function (err, doc) {
                                if (err)
                                    return res.json(Utils.genResponse("profile creation error"));
                                res.json(Utils.genResponse(null, true, genRespObj(doc)));
                            });
                        }
                    });
                } else {
                    res.json(Utils.genResponse("Facebook user retrieval error"));
                }
            });
        };

        this.validateAuth = function (authToken, cb) {
            profileModel.validateToken(authToken, cb);
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
                return res.json(Utils.genResponse("Unauthorized"));
            var skip = parseInt(req.query.skip), limit = parseInt(req.query.limit);
            profileModel.getProfiles({
                skip: skip,
                limit: limit
            }, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("profile retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.peopleByEarning = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var skip = parseInt(req.query.skip), limit = parseInt(req.query.limit);
            profileModel.getProfilesByEarn({
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
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.params.id;
            profileModel.getProfile(profID, function (err, doc) {
                if (err || !doc)
                    return res.json(Utils.genResponse("profile retrieval error"));
                res.json(Utils.genResponse(null, true, doc));
            });
        };

        this.getAccounts = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var skip = parseInt(req.query.skip), limit = parseInt(req.query.limit);
            var profID = req.params.id;
            accModel.getTransactions(profID, {
                skip: skip,
                limit: limit
            }, function (err, docs) {
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
                    profile.lastearn = profile.wealth - profile.lastwealth;
                    profile.lastwealth = profile.wealth;
                    profile.save();
                }
            });
        });

    })();

};