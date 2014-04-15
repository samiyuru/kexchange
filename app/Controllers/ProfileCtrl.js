/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initCtrl = function (models) {

    var profileModel = models.profileModel;

    return new (function (models) {

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