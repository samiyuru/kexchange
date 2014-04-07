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
            },
            debitor: null
        }, function (err, doc) {
            doc.profit = doc.profit.amount;
            cb(err, doc);
        });
    };

    investmentSchema.statics.getInvestors = function (skip, limit) {
        //always order by date
    };

    investmentSchema.statics.getLoansOf = function (personID) {

    };

    investmentSchema.statics.getInvestmentsOf = function (profId, cb) {
        this.find({
            investor: {
                id: TypObjectID(profId)
            }
        })
            .sort('-investor.date')
            .exec(function (err, docs) {
                if (err) {
                    cb(err, docs);
                    return;
                }
                var len = docs.length;
                for (var i = 0; i < len; i++) {
                    var doc = docs[i];
                    doc.profit = doc.profit.amount;
                }
                cb(err, docs);
            });
    };

    investmentSchema.statics.changeProfit = function (investmentID) {

    };

    investmentSchema.statics.payBackInvestment = function (investmentID) {

    };

    return mongoose.model('investment', investmentSchema);
};