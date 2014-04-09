var fs = require('fs');
var _testLoggedID = "5341380fe2fa98900e2e46d7";

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
        ctrls.investmentCtrl.investmentsOf(req.params.id, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            res.json(doc);
        });
    });
    app.get('/api/profile/:id/moneytaken', function (req, res) {
        ctrls.investmentCtrl.getMoneyTaken(req.params.id, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            res.json(doc);
        });
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
        ctrls.investmentCtrl.getInvestors(_testLoggedID, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            res.json(doc);
        });
    });
    app.post('/api/investments', function (req, res) {
        ctrls.investmentCtrl.newInvestment(_testLoggedID, req.query.amount, req.query.profit, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            console.log("inserted: " + doc);
            res.json(doc);
        });
    });
    app.delete('/api/investments/:id', function (req, res) {//delete investment
        ctrls.investmentCtrl.rmInvestment(_testLoggedID, req.params.id, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            console.log("deleted:" + doc);
            res.json(doc);
        });
    });
    app.put('/api/investments/:id/profit', function (req, res) {//update profit change
        ctrls.investmentCtrl.changeProfit(_testLoggedID, req.params.id, req.query.profit, function (err, doc) {
            if (err) {
                console.warn(err);
                res.json({err: "ERROR"});
                return;
            }
            console.log("profit updated:" + doc);
            res.json(doc);
        });
    });
    app.put('/api/investments/:id/payback', function (req, res) {//update profit change
        ctrls.investmentCtrl.payBack(_testLoggedID, req.params.id, function (status) {
            console.log("payback:" + status);
            res.json(status);
        });
    });
    app.put('/api/investments/:id/take', function (req, res) {//update profit change
        ctrls.investmentCtrl.takeLoan(_testLoggedID, req.params.id, function (status) {
            console.log("takeLoan:" + status);
            res.json(status);
        });
    });


    app.get('/api/plugins/reload', function (req, res) {

    });

};
