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
    app.post('/api/products/:id/purchase', function (req, res) {
        if (req.kexProfile)
        //profID, productID, cb
            ctrls.productCtrl.purchase(req.kexProfile.id, req.params.id, function (status) {
                res.json(status);
            });
    });
    app.post('/api/products/:id/bid', function (req, res) {
        if (req.kexProfile)
        //profID, productID, bid, cb
            ctrls.productCtrl.placeBid(req.kexProfile.id, req.params.id, req.query.bid, function (status) {
                res.json(status);
            });
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