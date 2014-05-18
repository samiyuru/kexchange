/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose, accEvent) {

    var ObjectId = mongoose.Schema.ObjectId;

    var TransTypes = {
        EARNING: 0,
        PROFIT_GET: 1,
        PROFIT_PAY: 2,
        INVEST_ADD: 3,
        INVEST_REM: 4,
        TAX_PAY: 5,
        SOLD: 6,
        BOUGHT: 7
    };

    accEvent.sub();

    var accountSchema = new mongoose.Schema({
        owner: {
            type: ObjectId,
            required: true
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
            type: ObjectId
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

    function addTransaction(ownerID, type, deal) {

    };

    function getTransactions(ownerID, options) {
        /*
         *opt:{
         *   limit:
         *   skip:
         * }
         * */
    };

    return {
        addTransaction: addTransaction,
        getTransactions: getTransactions
    };

};