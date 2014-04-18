/**
 * Created by samiyuru on 4/16/14.
 */

var formidable = require('formidable');

module.exports.route = function (app, ctrls) {

    app.get('/api/investments', function (req, res) {//get investors list
        if (req.kexProfile)
            ctrls.investmentCtrl.getInvestors(req.kexProfile.id, function (status) {
                res.json(status);
            });
    });
    app.post('/api/investments', function (req, res) {//create investment
        if (req.kexProfile)
            ctrls.investmentCtrl.newInvestment(req.kexProfile.id, req.query.amount, req.query.profit, function (status) {
                res.json(status);
            });
    });
    app.delete('/api/investments/:id', function (req, res) {//delete investment
        if (req.kexProfile)
            ctrls.investmentCtrl.rmInvestment(req.kexProfile.id, req.params.id, function (status) {
                res.json(status);
            });
    });
    app.put('/api/investments/:id/profit', function (req, res) {//update profit change
        if (req.kexProfile)
            ctrls.investmentCtrl.changeProfit(req.kexProfile.id, req.params.id, req.query.profit, function (status) {
                res.json(status);
            });
    });
    app.put('/api/investments/:id/payback', function (req, res) {//payback loan
        if (req.kexProfile)
            ctrls.investmentCtrl.payBack(req.kexProfile.id, req.params.id, function (status) {
                res.json(status);
            });
    });
    app.put('/api/investments/:id/take', function (req, res) {//get a loan
        if (req.kexProfile)
            ctrls.investmentCtrl.takeLoan(req.kexProfile.id, req.params.id, function (status) {
                res.json(status);
            });
    });

}