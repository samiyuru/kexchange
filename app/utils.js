/**
 * Created by samiyuru on 4/10/14.
 */

module.exports = {
    genResponse: function (err, success, data) {
        var res = {};
        res.err = err;
        if (success) {
            res.success = success;
        }
        if (data) {
            res.data = data;
        }
        return res;
    },

    getProfileFieldsPub: function () {
        return {name: 1, nickname: 1, wealth: 1, propic: 1, loan: 1, status: 1, soldQty: 1};
    }
};