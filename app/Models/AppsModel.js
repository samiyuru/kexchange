/**
 * Created by samiyuru on 4/4/14.
 */

var uuid = require('node-uuid');
var Utils = require(__base + "/utils");

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId,
        Mixed = mongoose.Schema.Types.Mixed,
        TypObjectID = mongoose.Types.ObjectId;

    var appsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        secret: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        iconUrl: {
            type: String,
            required: true
        },
        users: [
            {
                type: ObjectId,
                ref: 'profile'
            }
        ]
    }, {
        collection: 'apps'
    });

    var model = mongoose.model('plugin', appsSchema);

    function registerApp(name, desc, url, iconUrl, cb) {
        model.create({
            name: name,
            secret: uuid.v4(),
            description: desc,
            url: url,
            iconUrl: iconUrl
        }, cb);
    }

    function unregisterApp(appId, cb) {
        model.removeById(TypObjectID(appId), cb);
    }

    function installApp(userId, appId, cb) {
        model.updateById(TypObjectID(appId), {
            $push: {
                users: TypObjectID(userId)
            }
        }, cb);
    }

    function uninstallApp(userId, appId, cb) {
        model.update({
            _id: TypObjectID(appId),
            users: TypObjectID(userId)
        }, {
            $pull: {
                users: TypObjectID(userId)
            }
        }, cb);
    }

    function getUsersOf(appId, cb) {
        model.findById(TypObjectID(appId))
            .populate('users', Utils.getProfileFieldsPub())
            .select("users")
            .exec(function (err, doc) {
                if (!err && doc) {
                    var users = doc.users;
                    cb(users);
                    return;
                }
                cb(null);
            });
    }

    return {
        registerApp: registerApp,
        unregisterApp: unregisterApp,
        installApp: installApp,
        uninstallApp: uninstallApp,
        getUsersOf: getUsersOf
    };
};

