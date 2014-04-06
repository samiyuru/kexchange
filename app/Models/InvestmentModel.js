/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId;

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
                required: true
            }
        },
        debitor: {
            date: {
                type: Date
            },
            id: {
                type: ObjectId
            }
        }
    }, {
        collection: 'investments'
    });

    investmentSchema.statics.getInvestors = function (skip, limit) {
        //always order by date
    };

    investmentSchema.statics.getLoansOf = function (personID) {

    };

    investmentSchema.statics.getInvestmentsOf = function (personID) {

    };

    investmentSchema.statics.changeProfit = function (investmentID) {

    };

    investmentSchema.statics.payBackInvestment = function (investmentID) {

    };

    return mongoose.model('investment', investmentSchema);
};