/**
 * Created by samiyuru on 4/16/14.
 */

module.exports.route = function (app, ctrls) {

    app.get('/api/investments', ctrls.investmentCtrl.getInvestors);

    app.post('/api/investments', ctrls.investmentCtrl.newInvestment);

    app.delete('/api/investments/:id', ctrls.investmentCtrl.rmInvestment);

    app.put('/api/investments/:invId/profit', ctrls.investmentCtrl.changeProfit);

    app.put('/api/investments/:invId/payback', ctrls.investmentCtrl.payBack);

    app.put('/api/investments/:invId/take', ctrls.investmentCtrl.takeLoan);

}