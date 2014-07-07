/**
 * Created by samiyuru on 4/4/14.
 */

var Utils = require(__base + "/utils");

module.exports.initModel = function (mongoose, accEvent) {

    var ObjectId = mongoose.Schema.ObjectId,
        Mixed = mongoose.Schema.Types.Mixed,
        TypObjectID = mongoose.Types.ObjectId;

    var EV_ACC_TRANS = require(__base + "/constants").events.EVENT_ACCOUNT_TRANS;
    var transTypes = require(__base + "/constants").accounts.transTypes;

    var accountSchema = new mongoose.Schema({
        owner: {
            type: ObjectId,
            required: true,
            ref: 'profile'
        },
        subject: {
            id: {
                type: ObjectId
            },
            nickname: {
                type: String
            }
        },
        object: {
            type: Mixed//can contain string object ids
        },
        amount: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
        type: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true,
            index: true
        }
    }, {
        collection: 'accounts'
    });

    var model = mongoose.model('account', accountSchema);

    accEvent.sub(EV_ACC_TRANS, function (transInf) {
        transInf.owner = TypObjectID(transInf.owner);
        if (transInf.subject)
            transInf.subject.id = TypObjectID(transInf.subject.id);
        model.create(transInf);
    });

    function getTransactions(ownerID, chunk, cb) {
        var query = model.find({
            owner: TypObjectID(ownerID)
        })
            .sort('-date')
            .select('-__v');
        if (chunk != null) {
            query = query.skip(chunk.skip).limit(chunk.limit);
        }
        query.exec(cb);
    };

    function getAppUserEarnings(chunk, cb) {
        var query = model.aggregate([
            {
                $group: {
                    _id: "$object.batchId",
                    amount: {
                        $sum: "$amount"
                    },
                    user: {
                        $last: "$owner"
                    },
                    count: {
                        $sum: 1
                    },
                    app: {
                        $last: "$object.app"
                    },
                    appIco: {
                        $last: "$object.appIco"
                    },
                    detail: {
                        $last: "$object.detail"
                    },
                    date: {
                        $last: "$date"
                    }
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]);
        if (chunk != null) {
            query = query.skip(chunk.skip).limit(chunk.limit);
        }
        query.exec(cb);// aggregation cb gives plain js data objects
    }

    return {
        getTransactions: getTransactions,
        getAppUserEarnings: getAppUserEarnings
    };

};