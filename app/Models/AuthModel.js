/**
 * Created by samiyuru on 4/16/14.
 */

var uuid = require('node-uuid');
var Utils = require(__base + "/utils");
var CryptoJS = require(__base + '/services/sha3');

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

    var model = mongoose.model('auth', authSchema);

    function createAuth(profile, password, cb) {
        model.create({
            nickname: profile.nickname,
            password: CryptoJS.SHA3(password),
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

    function validateToken(authToken, cb) {
        model.findOne({
            token: authToken
        })
            .populate('profile', Utils.getProfileFieldsPub())
            .select("profile")
            .exec(function (err, doc) {
                if (!err && doc) {
                    var profile = doc.profile;
                    cb(profile);
                    return;
                }
                cb(null);
            });
    };

    function getAuthToken(user, pass, cb) {
        model.findOne({
            nickname: user,
            password: pass
        })
            .populate('profile', Utils.getProfileFieldsPub())
            .select("-password -nickname -_id -__v")
            .exec(cb);
    };

    return {
        createAuth: createAuth,
        validateToken: validateToken,
        getAuthToken: getAuthToken
    };

};

