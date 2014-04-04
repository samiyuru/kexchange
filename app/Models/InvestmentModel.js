/**
 * Created by samiyuru on 4/4/14.
 */

module.exports = function (mongoose) {
    var Investment = mongoose.model('investment', {
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
                type: mongoose.Schema.ObjectId,
                required: true
            }
        },
        debitor: {
            date: {
                type: Date
            },
            id: {
                type: mongoose.Schema.ObjectId
            }
        }
    }, 'investments');

    this.getInvestors = function (opt) {
        //always order by date
        /*
         * {
         *   skip:0,
         *   limit:0
         * }
         * */
    };

    this.getLoansOf = function (personID) {

    };

    this.getInvestmentsOf = function (personID) {

    };

    this.changeProfit = function (investmentID) {

    };

    this.payBackInvestment = function (investmentID) {

    };
};