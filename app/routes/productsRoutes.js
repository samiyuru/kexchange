/**
 * Created by samiyuru on 4/16/14.
 */

var formidable = require('formidable');

module.exports.route = function (app, ctrls) {

    app.get('/api/products', function (req, res) {
        if (req.kexProfile)
        //profID, isAuction, chunk, cb
            ctrls.productCtrl.getProductsFor(req.kexProfile.id, req.query.isauction, null, function (status) {
                res.json(status);
            });
    });
    app.get('/api/products/:id/purchase', function (req, res) {

    });
    app.get('/api/products/:id/bids', function (req, res) {

    });
    app.get('/api/products/:id/newbid', function (req, res) {

    });
    app.post('/api/products/', function (req, res) {
        if (req.kexProfile) {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                ctrls.productCtrl.createProduct(req.kexProfile.id, fields, files, function (status) {
                    res.json(status);
                });
            });
        }
    });
    app.get('/api/products/:id/remove', function (req, res) {

    });

}