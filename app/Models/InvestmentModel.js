/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var PROFIT_CHANGE_EFFECT_GAP = 14 * 24 * 3600 * 1000;//days

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

    investmentSchema.statics.createInvestment = function (investorId, amount, profit, cb) {
        this.create({
            amount: amount,
            profit: {
                amount: profit
            },
            investor: {
                date: new Date(),
                id: TypObjectID(investorId)
            }
        }, function (err, doc) {
            /*
             * {
             *   _id
             *   profit
             *   amount
             *   investor{
             *       date
             *       id
             *   }
             * }
             * */
            if (err) {
                cb(err, docs);
                return;
            }
            doc.profit = doc.profit.amount;
            cb(err, doc);
        });
    };

    investmentSchema.statics.rmInvestment = function (investorID, invID, cb) {
        this.findByIdAndRemove({
            _id: TypObjectID(invID),
            "investor.id": TypObjectID(investorID)
        }, cb);
    };

    investmentSchema.statics.rmInvestmentById = function (invID, cb) {
        this.findByIdAndRemove({
            _id: TypObjectID(invID)
        }, cb);
    };

    investmentSchema.statics.findInvestments = function (findObj, chunk, resInvestor, resDebitor, cb) {//investmentSchema.statics is used inorder to have a valid this ref inside of the function
        var query = this.find(findObj)
            .sort('-debitor.date')
            .sort('-investor.date')
            .select('-__v');
        if (resInvestor) {
            query = query.populate('investor.id', {'name': 1, 'nickname': 1, 'wealth': 1, 'propic': 1});
        }
        if (resDebitor) {
            query = query.populate('debitor.id', {'name': 1, 'nickname': 1, 'wealth': 1, 'propic': 1});
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

    investmentSchema.statics.getInvestors = function (exclInvestorID, chunck, cb) {
        //always order by date
        this.findInvestments({//'this' is used becs findInvestments() is assigned to this context by mongoose in the end
            "investor.id": {
                $ne: TypObjectID(exclInvestorID)
            },
            debitor: null
        }, chunck, true, false, cb);
    };

    investmentSchema.statics.getLoans = function (debitorId, cb) {
        this.findInvestments({
            "debitor.id": TypObjectID(debitorId)
        }, null, true, false, cb);
    };

    investmentSchema.statics.getInvestmentsOf = function (investorId, cb) {
        this.findInvestments({
            "investor.id": TypObjectID(investorId)
        }, null, false, true, cb);
    };

    investmentSchema.statics.changeProfit = function (investorId, invId, newProfit, cb) {
        this.findOne({
            _id: TypObjectID(invId),
            "investor.id": TypObjectID(investorId)
        }).exec(function (err, doc) {
            if (err || doc == null) {
                cb(err, doc);
            } else {
                var efctDate = new Date((new Date()).getTime() + PROFIT_CHANGE_EFFECT_GAP);
                if (doc.profit.amount == newProfit) {
                    doc.profit.change = null;
                } else if (!doc.debitor || !doc.debitor.id) {//if the loan is not yet taken
                    doc.profit.amount = newProfit;
                    doc.profit.change = null;
                } else {
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

    investmentSchema.statics.getInvestmentById = function (invID, cb) {
        this.findById(TypObjectID(invID), cb);
    };

    investmentSchema.statics.takeLoan = function (invID, profID, cb) {

    };

    return mongoose.model('investment', investmentSchema);
};