/**
 * Created by samiyuru on 4/4/14.
 */

module.exports = function (mongoose) {
    /*
     * types -> earning, profitpay, profit receive, tax, product sold, product bought
     * */

    this.ActTypes = {
        EARNING: 0,
        PROFIT: 1,
        PROFIT_PAY: 2,
        TAX_PAY: 3,
        SOLD: 4,
        BOUGHT: 5
    };

    var Investment = mongoose.model('account', {
        owner:{
            type: mongoose.Schema.ObjectID,
            required: true
        },
        description: {
            type: String,
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
        },
        amount: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
        subject: {
            type: mongoose.Schema.ObjectID
        }
    }, 'accounts');


    this.addTransaction = function(){

    };

    this.getTransactions = function(personID, opt){
        /*
        *opt:{
        *   limit:
        *   skip:
        * }
        * */
    };

};