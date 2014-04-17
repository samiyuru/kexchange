/**
 * Created by samiyuru on 4/16/14.
 */

var Utils = require(__base + "/utils");
var formidable = require('formidable');

module.exports.route = function (app, ctrls) {

    app.get('/api/authorize', function (req, res) {
        if (req.kexProfile) {
            res.json(Utils.genResponse(null, true, req.kexProfile));
        } else {
            res.json(Utils.genResponse("Unauthorized"));
        }
    });

    app.post('/api/authorize', function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            ctrls.profileCtrl.getAuthToken(fields.user, fields.pass, req.kexProfile, function (status) {
                res.json(status);
            });
        });
    });

    app.get('/api/profiles', function (req, res) {
        if (req.kexProfile)
            ctrls.profileCtrl.peopleByWealth(req.query.skip, req.query.limit, function (status) {
                res.json(status);
            });
    });
    app.get('/api/profile', function (req, res) {

    });
    app.get('/api/profile/new', function (req, res) {

    });
    app.get('/api/profile/:id', function (req, res) {
        if (req.kexProfile)
            ctrls.profileCtrl.getProfile(req.params.id, function (status) {
                res.json(status);
            });
    });
    app.get('/api/profile/:id/bids', function (req, res) {

    });
    app.get('/api/profile/:id/purchases', function (req, res) {

    });
    app.get('/api/profile/:id/investments', function (req, res) {
        if (req.kexProfile)
            ctrls.investmentCtrl.investmentsOf(req.params.id, function (status) {
                res.json(status);
            });
    });
    app.get('/api/profile/:id/accounts', function (req, res) {

    });
    app.get('/api/profile/:id/moneytaken', function (req, res) {
        if (req.kexProfile)
            ctrls.investmentCtrl.getLoans(req.params.id, function (status) {
                res.json(status);
            });
    });
    app.get('/api/profile/:id/products', function (req, res) {
        if (req.kexProfile)
        //profID, isAuction, chunk, cb
            ctrls.productCtrl.getProductsOf(req.params.id, req.query.isauction, null, function (status) {
                res.json(status);
            });
    });
    app.get('/api/profile/:id/notifications', function (req, res) {

    });

}