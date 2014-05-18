/**
 * Created by samiyuru on 5/18/14.
 */

module.exports = {
    events: {
        EVENT_ACCOUNT_TRANS: 0
    },
    accounts: {
        transTypes: {
            EARNING: 0, // +
            TAX: 1,     // -
            LOANGET: 7, // +
            INVEST_ADD: 2,  // -
            INVEST_REM: 3,  // +
            PROFIT: 4,  // affects 2 people + -
            PRODUCT: 5, // affects 2 people + -
            LOANPAY: 6   // affects 2 people + -
        }
    }
};