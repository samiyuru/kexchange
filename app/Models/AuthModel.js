/**
 * Created by samiyuru on 4/16/14.
 */

var uuid = require('node-uuid');
var tokenCache = {};
var Utils = require(__base + "/utils");

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId,
        TypObjectID = mongoose.Types.ObjectId;

    var authSchema = new mongoose.Schema({
        nickname: {
            type: String,
            required: true,
            unique: true,
            dropDubs: true
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            type: ObjectId,
            required: true,
            unique: true,
            dropDubs: true,
            ref: 'profile'
        },
        token: {
            type: String,
            required: true,
            unique: true,
            dropDubs: true
        }
    }, {
        collection: 'authorization'
    });

    authSchema.statics.createAuth = function (profile, password, cb) {
        this.create({
            nickname: profile.nickname,
            password: password,
            profile: profile._id,
            token: uuid.v4()
        }, function (err, doc) {
            if (!err) {
                cb(null, {
                    profile: profile,
                    token: doc.token
                });
                return;
            }
            cb(err, null);
        });
    };

    authSchema.statics.validateToken = function (authToken, cb) {
        var profile = tokenCache[authToken];
        if (profile) {
            cb(profile);
        } else {
            this.findOne({
                token: authToken
            })
                .populate('profile', Utils.getProfileFieldsPub())
                .select("profile")
                .exec(function (err, doc) {
                    if (!err && doc) {
                        profile = doc.profile;
                        tokenCache[authToken] = profile;
                        cb(profile);
                        return;
                    }
                    cb(null);
                });
        }
    };

    authSchema.statics.getAuthToken = function (user, pass, cb) {
        this.findOne({
            nickname: user,
            password: pass
        })
            .populate('profile', Utils.getProfileFieldsPub())
            .select("-password -nickname -_id -__v")
            .exec(cb);
    };

    return mongoose.model('auth', authSchema);

};

