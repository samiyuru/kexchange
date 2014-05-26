/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initModel = function (mongoose, accEvent) {
    var EV_ACC_TRANS = require(__base + "/constants").events.EVENT_ACCOUNT_TRANS;

    var ObjectId = mongoose.Schema.ObjectId,
        TypObjectID = mongoose.Types.ObjectId;

    var transTypes = require(__base + "/constants").accounts.transTypes;

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
        //profile.wealth = 0;
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

    function getAllProfiles(cb) {//for last profit calculation
        model.find({}).exec(cb);
    };

    function publishTransInfo(transInfo) {//trans info does not contain objIds
        var subjId = transInfo.subject;
        if (subjId) {
            model.findById(TypObjectID(subjId), function (err, doc) {
                if (err || !doc) {
                    transInfo.subject = null;
                } else {
                    transInfo.subject = {
                        nickname: doc.nickname,
                        id: subjId
                    };
                }
                accEvent.pub(EV_ACC_TRANS, transInfo);
            });
        } else {
            accEvent.pub(EV_ACC_TRANS, transInfo);
        }
    }

    function putMoney(profID, amount, transInfo, cb) { //all params must be string
        var update = {
            $inc: {
                wealth: amount
            }
        };
        if (transInfo.type == transTypes.LOANGET) {
            update.$inc.loan = amount;
        }
        model.findByIdAndUpdate(TypObjectID(profID), update, function (err, doc) {
            if (err || !doc)
                return cb(false);
            //--------------
            transInfo.date = new Date();
            transInfo.owner = profID;
            transInfo.balance = doc.wealth;
            transInfo.amount = amount;
            publishTransInfo(transInfo);
            cb(true);
        });
    };

    function getMoney(profID, amount, transInfo, cb) { //all params must be string
        var srch = {
            _id: TypObjectID(profID),
            wealth: {
                $gte: amount
            }
        };
        var update = {
            $inc: {
                wealth: 0 - amount
            }
        };

        if (transInfo.type == transTypes.LOANPAY) {
            update.$inc.loan = 0 - amount;
        }

        model.findOneAndUpdate(srch, update, function (err, doc) {
            if (err || !doc)
                return cb(0);
            //--------------
            transInfo.date = new Date();
            transInfo.owner = profID;
            transInfo.balance = doc.wealth;
            transInfo.amount = 0 - amount;
            publishTransInfo(transInfo);
            cb(amount);
        });
    };

    function transferMoney(fromProfID, toProfID, amount, transInfo, cb) { //all params must be string
        var objOfTrans = transInfo.object;
        var transInfoGet = {
            type: transInfo.type,
            subject: toProfID,
            object: objOfTrans
        };
        getMoney(fromProfID, amount, transInfoGet, function moneyGetCB(_amount) {
            if (amount != _amount) {
                cb("money retrieval error", false);
                return;
            }
            var transInfoPut = {
                type: transInfo.type,
                subject: fromProfID,
                object: objOfTrans
            };
            putMoney(toProfID, amount, transInfoPut, function moneyGiveCB(success) {
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
        getAllProfiles: getAllProfiles,
        putMoney: putMoney,
        getMoney: getMoney,
        transferMoney: transferMoney
    };

};

