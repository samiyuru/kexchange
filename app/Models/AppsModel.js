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
            required: true,
            unique: true
        },
        secret: {
            type: String,
            required: true
        },
        desc: {
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
        userCount: {
            type: Number,
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
            desc: desc,
            url: url,
            iconUrl: iconUrl,
            userCount: 0
        }, cb);
    }

    function unregisterApp(appId, cb) {
        model.findByIdAndRemove(TypObjectID(appId), cb);
    }

    function getAppById(appId, cb) {
        model.findById(TypObjectID(appId)).exec(cb);
    }

    function installApp(userId, appId, cb) {
        model.updateById(TypObjectID(appId), {
            $inc: {
                userCount: 1
            },
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
            $inc: {
                userCount: -1
            },
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

    function getAllApps(isAdmin, cb) {
        var query = model.find({});
        query.select('-users');
        if (!isAdmin)
            query.select('-secret');
        query.exec(cb);
    }

    function getInstalledApps(profId, cb) {
        var profId = TypObjectID(profId);
        model.find({
            users: profId
        }).select({secret: -1, users: -1})
            .exec(cb);
    }

    return {
        registerApp: registerApp,
        unregisterApp: unregisterApp,
        installApp: installApp,
        uninstallApp: uninstallApp,
        getUsersOf: getUsersOf,
        getAppById: getAppById,
        getAllApps: getAllApps
    };
};

