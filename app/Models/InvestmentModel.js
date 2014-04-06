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
        profitRate: {
            type: Number,//percent
            required: true
        },
        profitChange: {
            newProfitRate: {
                type: Number
            },
            date: {
                type: Date
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