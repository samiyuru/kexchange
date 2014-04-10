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
    }
};