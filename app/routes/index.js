var fs = require('fs');

module.exports.route = function (app, ctrls) {

    console.log("routing...");

    app.get('/api/profiles', function (req, res) {
        ctrls.profileCtrl.peopleByWealth(req.query.skip, req.query.limit, function cb(err, docs) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            res.json(docs);
        });
    });
    app.get('/api/profile', function (req, res) {

    });
    app.get('/api/profile/new', function (req, res) {

    });
    app.get('/api/profile/:id', function (req, res) {

    });
    app.get('/api/profile/:id/bids', function (req, res) {

    });
    app.get('/api/profile/:id/purchases', function (req, res) {

    });
    app.get('/api/profile/:id/investments', function (req, res) {
        ctrls.investmentCtrl.investmentsOf(req.params.id, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            res.json(doc);
        });
    });
    app.get('/api/profile/:id/accounts', function (req, res) {

    });
    app.get('/api/profile/:id/loans', function (req, res) {

    });
    app.get('/api/profile/:id/loans/pay', function (req, res) {

    });
    app.get('/api/profile/:id/products', function (req, res) {

    });
    app.get('/api/profile/:id/notifications', function (req, res) {

    });


    app.get('/api/products', function (req, res) {

    });
    app.get('/api/products/:id/purchase', function (req, res) {

    });
    app.get('/api/products/:id/bids', function (req, res) {

    });
    app.get('/api/products/:id/newbid', function (req, res) {

    });
    app.get('/api/products/new', function (req, res) {

    });
    app.get('/api/products/:id/remove', function (req, res) {

    });


    app.get('/api/investments', function (req, res) {

    });
    app.post('/api/investments', function (req, res) {
        ctrls.investmentCtrl.newInvestment("53421bb56339790321ce19cf", req.query.amount, req.query.profit, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            res.json(doc);
        });
    });
    app.delete('/api/investments/:id', function (req, res) {
        ctrls.investmentCtrl.rmInvestment(req.params.id, function(err, docs){
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            res.json(docs);
        });
    });
    app.post('/api/investments/:id/pay', function (req, res) {

    });
    app.get('/api/investments/:id/take', function (req, res) {

    });


    app.get('/api/plugins/reload', function (req, res) {

    });

};
