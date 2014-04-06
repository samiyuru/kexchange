/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {
    /*
     * types -> earning, profitpay, profit receive, tax, product sold, product bought
     * */
    var ObjectId = mongoose.Schema.ObjectId;

    this.ActTypes = {
        EARNING: 0,
        PROFIT: 1,
        PROFIT_PAY: 2,
        TAX_PAY: 3,
        SOLD: 4,
        BOUGHT: 5
    };

    var accountSchema = new mongoose.Schema({
        owner:{
            type: ObjectId,
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
            type: ObjectId
        }
    }, {
        collection: 'accounts'
    });

    accountSchema.statics.addTransaction = function(){

    };

    accountSchema.statics.getTransactions = function(personID, opt){
        /*
        *opt:{
        *   limit:
        *   skip:
        * }
        * */
    };

    return mongoose.model('account', accountSchema);

};