/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initCtrl = function (models) {

    var profileModel = models.profileModel;
    var authModel = models.authModel;

    return new (function (models) {

        this.createProfile = function (profile, password, cb) {
            profileModel.createProfile(profile, function (err, doc) {
                if (err) {
                    cb(Utils.genResponse("profile creation error"));
                    return;
                }
                authModel.createAuth(doc, password, function (err, doc) {
                    if (err) {
                        cb(Utils.genResponse("profile auth creation error"));
                        return;
                    }
                    cb(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.validateAuth = function (authToken, cb) {
            authModel.validateToken(authToken, cb);
        }

        this.getAuthToken = function (user, pass, cb) {
            authModel.getAuthToken(user, pass, function (err, doc) {
                if (err) {
                    cb(Utils.genResponse("auth token retrieval error"));
                    return;
                }
                if (!doc) {
                    cb(Utils.genResponse("Invalid username/password"));
                    return;
                }
                cb(Utils.genResponse(null, true, doc));
            });
        };

        this.peopleByWealth = function (skip, limit, cb) {
            profileModel.getProfiles({
                skip: skip,
                limit: limit
            }, function (err, docs) {
                if (err) {
                    cb(Utils.genResponse("profile retrieval error"));
                    return;
                }
                cb(Utils.genResponse(null, true, docs));
            });
        };

        this.getProfile = function (profID, cb) {
            profileModel.getProfile(profID, function (err, doc) {
                if (err) {
                    cb(Utils.genResponse("profile retrieval error"));
                    return;
                }
                cb(Utils.genResponse(null, true, doc));
            });
        };

    })();

};