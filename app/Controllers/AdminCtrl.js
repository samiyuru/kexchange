/**
 * Created by samiyuru on 7/6/14.
 */

var Utils = require(__base + "/utils");
var config = require(__base + '/config');

module.exports.initCtrl = function (models) {

    return new (function () {

        this.validateAdmin = function (req, res) {
            if (req.isAdmin()) {
                res.json(Utils.genResponse(null, true));
            } else {
                res.json(Utils.genResponse('Invalid credentials'));
            }
        }

    })();

}