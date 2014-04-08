/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var PROFIT_CHANGE_EFFECT_GAP = 14;//days

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
                newProfit: {
                    type: Number
                },
                date: {
                    type: Date
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

    investmentSchema.statics.createInvestment = function (profId, amount, profit, cb) {
        this.create({
            amount: amount,
            profit: {
                amount: profit
            },
            investor: {
                date: new Date(),
                id: TypObjectID(profId)
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
            doc.profit = doc.profit.amount;
            cb(err, doc);
        });
    };

    investmentSchema.statics.rmInvestment = function (investmentID, cb) {
        this.findByIdAndRemove(TypObjectID(investmentID), cb);
    };

    investmentSchema.statics.findInvestments = function (findObj, chunk, cb) {//investmentSchema.statics is used inorder to have a valid this ref inside of the function
        var query = this.find(findObj)
            .sort('-debitor.date')
            .sort('-investor.date')
            .populate('investor.id')
            .populate('debitor.id');

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
                doc.profit = doc.profit.amount;
                doc.investor.id.purchases = undefined;
                doc.investor.id.lastwealth = undefined;
                if (doc.debitor && doc.debitor.id) {
                    doc.debitor.id.purchases = undefined;
                    doc.debitor.id.lastwealth = undefined;
                }
            }
            cb(err, docs);
        });
    }

    investmentSchema.statics.getInvestors = function (exclProfID, skip, limit) {
        //always order by date
        this.findInvestments({//this is used becs findInvestments() is assigned to this context by mongoose in the end
            "investor.id": {
                $ne: TypObjectID(profId)
            }
        }, {
            skip: skip,
            limit: limit
        }, cb);
    };

    investmentSchema.statics.getLoansOf = function (profId, cb) {
        this.findInvestments({
            "debitor.id": TypObjectID(profId)
        }, null, cb);
    };

    investmentSchema.statics.getInvestmentsOf = function (profId, cb) {
        this.findInvestments({
            "investor.id": TypObjectID(profId)
        }, null, cb);
    };

    investmentSchema.statics.changeProfit = function (investmentID, cb) {

    };

    investmentSchema.statics.payBackInvestment = function (investmentID, cb) {
        this.rmInvestment(investmentID, cb);
    };

    return mongoose.model('investment', investmentSchema);
};