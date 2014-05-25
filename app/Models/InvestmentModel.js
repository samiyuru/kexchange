/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initModel = function (mongoose) {

    var PROFIT_CHANGE_GAP = require(__base + "/constants").investments.PROFIT_CHANGE_GAP;

    var ObjectId = mongoose.Schema.ObjectId,
        TypObjectID = mongoose.Types.ObjectId;

    var investmentSchema = new mongoose.Schema({
        amount: {
            type: Number,
            required: true
        },
        profit: {
            amount: {
                type: Number,//current
                required: true
            },
            lastDate: {//last profit pay/receive date
                type: Date
            },
            change: {
                profit: {
                    type: Number
                },
                date: {
                    type: Date//effects after this date
                }
            }
        },
        investor: {
            date: {
                type: Date,
                required: true
            },
            id: {
                type: ObjectId,
                required: true,
                ref: 'profile'
            }
        },
        debitor: {
            date: {
                type: Date
            },
            id: {
                type: ObjectId,
                ref: 'profile'
            }
        }
    }, {
        collection: 'investments'
    });

    var model = mongoose.model('investment', investmentSchema)

    function createInvestment(investorId, amount, profit, cb) {
        var now = new Date();
        model.create({
            amount: amount,
            profit: {
                amount: profit,
                lastDate: now
            },
            investor: {
                date: now,
                id: TypObjectID(investorId)
            }
        }, function (err, doc) {
            if (!err && doc) {
                doc.profit = doc.profit.amount;
            }
            cb(err, doc);
        });
    };

    function rmInvestmentByInvestor(investorID, invstmntID, cb) {
        model.findOneAndRemove({
            _id: TypObjectID(invstmntID),
            "investor.id": TypObjectID(investorID),
            debitor: {
                $exists: false
            }
        }, cb);
    };

    function rmInvestmentById(invstmntID, cb) {
        model.findByIdAndRemove({
            _id: TypObjectID(invstmntID)
        }, cb);
    };

    function findInvestments(findObj, chunk, resInvestor, resDebitor, cb) {//investmentSchema.statics is used inorder to have a valid this ref inside of the function
        var query = model.find(findObj)
            .sort('-debitor.date')
            .sort('-investor.date')
            .select('-__v');
        if (resInvestor) {
            query = query.populate('investor.id', Utils.getProfileFieldsPub());
        }
        if (resDebitor) {
            query = query.populate('debitor.id', Utils.getProfileFieldsPub());
        }
        if (chunk != null) {
            query = query.skip(chunk.skip).limit(chunk.limit);
        }
        query.exec(function (err, docs) {
            if (err) {
                cb(err, docs);
                return;
            }
            var len = docs.length;
            for (var i = 0; i < len; i++) {
                var doc = docs[i];
            }
            cb(err, docs);
        });
    }

    function getInvestors(exclInvestorID, chunck, cb) {
        //always order by date
        findInvestments({//'this' is used becs findInvestments() is assigned to this context by mongoose in the end
            "investor.id": {
                $ne: TypObjectID(exclInvestorID)
            },
            debitor: {
                $exists: false
            }
        }, chunck, true, false, cb);
    };

    function getLoans(debitorId, cb) {
        findInvestments({
            "debitor.id": TypObjectID(debitorId)
        }, null, true, true, cb);
    };

    function getAllLoans(cb) {//get loans of all users for profit process cron
        findInvestments({
            debitor: {
                $exists: true
            }
        }, null, false, false, cb);
    }

    function getInvestmentsOf(investorId, cb) {
        findInvestments({
            "investor.id": TypObjectID(investorId)
        }, null, true, true, cb);
    };

    function changeProfit(investorId, invstmntID, newProfit, cb) {
        model.findOne({
            _id: TypObjectID(invstmntID),
            "investor.id": TypObjectID(investorId)
        }).exec(function (err, doc) {
            if (err || doc == null) {
                cb(err || {}, doc);
            } else {
                var efctDate = new Date((new Date()).getTime() + PROFIT_CHANGE_GAP);
                if (doc.profit.amount == newProfit) {
                    doc.profit.change = null;
                } else if (!doc.debitor || !doc.debitor.id) {//if the loan is not yet taken
                    doc.profit.amount = newProfit;
                    doc.profit.change = null;
                } else {//if loan is already taken
                    doc.profit.change = {
                        date: efctDate,
                        profit: newProfit
                    };
                }
                doc.save(function (err, doc, num) {
                    cb(err, doc);
                });
            }
        });
    };

    function getInvestmentById(invstmntID, cb) {
        model.findById(TypObjectID(invstmntID), cb);
    };

    function takeLoan(invstmntID, profID, cb) {
        model.update({
            _id: TypObjectID(invstmntID),
            debitor: {
                $exists: false
            }
        }, {
            $set: {
                "debitor.id": TypObjectID(profID),
                "debitor.date": new Date()
            }
        }, cb);
    };

    return {
        createInvestment: createInvestment,
        rmInvestmentByInvestor: rmInvestmentByInvestor,
        rmInvestmentById: rmInvestmentById,
        getInvestors: getInvestors,
        getLoans: getLoans,
        getAllLoans: getAllLoans,
        getInvestmentsOf: getInvestmentsOf,
        changeProfit: changeProfit,
        getInvestmentById: getInvestmentById,
        takeLoan: takeLoan
    };
};