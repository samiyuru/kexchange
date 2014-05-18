/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initModel = function (mongoose, accEvent) {
    var EV_ACC_TRANS = require(__base + "/constants").events.EVENT_ACCOUNT_TRANS;

    var ObjectId = mongoose.Schema.ObjectId,
        TypObjectID = mongoose.Types.ObjectId;

    var profileSchema = new mongoose.Schema({
        nickname: {
            type: String,
            required: true,
            unique: true,
            dropDubs: true
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        loan: {
            type: Number,
            required: true
        },
        lastwealth: {
            type: Number,
            required: true
        },
        wealth: {
            type: Number,
            required: true
        },
        propic: {
            type: String,
            required: true
        },
        purchases: [
            {
                date: {
                    type: Date,
                    required: true
                },
                product: {
                    type: ObjectId,
                    required: true
                },
                price: {//added here for efficiency in finding price of an auctioned product
                    type: Number,
                    required: true
                }
            }
        ]
    }, {
        collection: 'profiles'
    });

    var model = mongoose.model('profile', profileSchema);

    function createProfile(profile, cb) {
        profile.wealth = 0;
        profile.lastwealth = 0;
        profile.loan = 0;
        profile.status = 'Beginner';
        model.create(profile, cb);
    };

    function getProfile(profID, cb) {
        model.findOne({
            _id: TypObjectID(profID)
        })
            .select(Utils.getProfileFieldsPub())
            .exec(cb);
    };

    function getProfiles(chunk, cb) {
        var findObj = {};
        var query = model.find({})
            .select(Utils.getProfileFieldsPub())
            .sort('-wealth');
        if (chunk) {
            query = query.skip(chunk.skip)
                .limit(chunk.limit);
        }
        query.exec(cb);
    };

    function publishTransInfo(transInfo) {
        var subject = transInfo.subject;
        if (subject) {
            model.findById(subject, function (err, doc) {
                if (err || !doc) {
                    transInfo.subject = null;
                } else {
                    transInfo.subject = {
                        nickname: doc.nickname,
                        id: subject
                    };
                }
                accEvent.pub(EV_ACC_TRANS, transInfo);
            });
        } else {
            accEvent.pub(EV_ACC_TRANS, transInfo);
        }
    }

    function putMoney(profID, amount, transInfo, cb) {
        model.findByIdAndUpdate(TypObjectID(profID.toString()), {
            $inc: {
                wealth: amount
            }
        }, function (err, doc) {
            if (err || !doc)
                return cb(false);
            //--------------
            transInfo.owner = TypObjectID(profID.toString());
            transInfo.balance = doc.wealth;
            transInfo.amount = amount;
            publishTransInfo(transInfo);
            cb(true);
        });
    };

    function getMoney(profID, amount, transInfo, cb) {
        model.findOneAndUpdate({
            _id: TypObjectID(profID.toString()),
            wealth: {
                $gte: amount
            }
        }, {
            $inc: {
                wealth: 0 - amount
            }
        }, function (err, doc) {
            if (err || !doc)
                return cb(0);
            //--------------
            transInfo.owner = TypObjectID(profID.toString());
            transInfo.balance = doc.wealth;
            transInfo.amount = 0 - amount;
            publishTransInfo(transInfo);
            cb(amount);
        });
    };

    function transferMoney(fromProfID, toProfID, amount, transInfo, cb) {// cb(err, isSuccess)
        fromProfID = TypObjectID(fromProfID.toString());
        toProfID = TypObjectID(toProfID.toString());
        var objOfTrans = TypObjectID(transInfo.object.toString());

        getMoney(fromProfID, amount, {
            type: transInfo.type,
            subject: toProfID,
            object: objOfTrans
        }, function moneyGetCB(_amount) {
            if (amount != _amount) {
                cb("money retrieval error", false);
                return;
            }
            putMoney(toProfID, amount, {
                type: transInfo.type,
                subject: fromProfID,
                object: objOfTrans
            }, function moneyGiveCB(success) {
                if (!success) {
                    cb("money transfer error", false);
                    return;
                }
                cb(null, true);
            });
        });
    }

    return {
        createProfile: createProfile,
        getProfile: getProfile,
        getProfiles: getProfiles,
        putMoney: putMoney,
        getMoney: getMoney,
        transferMoney: transferMoney
    };

};

