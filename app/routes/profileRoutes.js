/**
 * Created by samiyuru on 4/16/14.
 */

module.exports.route = function (app, ctrls) {

    app.get('/api/authorize', ctrls.profileCtrl.authorize);

    app.post('/api/authorize', ctrls.profileCtrl.getAuthToken);

    app.get('/api/profiles', ctrls.profileCtrl.peopleByWealth);

    app.get('/api/topearners', ctrls.profileCtrl.peopleByEarning);

    app.post('/api/profile/register', ctrls.profileCtrl.createProfileFB);

    app.get('/api/profile/:id', ctrls.profileCtrl.getProfile);

    app.get('/api/profile/:id/investments', ctrls.investmentCtrl.investmentsOf);

    app.get('/api/profile/:id/notifications', function () {});

    app.get('/api/profile/:id/accounts', ctrls.profileCtrl.getAccounts);

    app.get('/api/profile/:id/moneytaken', ctrls.investmentCtrl.getLoans);

    app.get('/api/profile/:id/products/bids', ctrls.productCtrl.getBidedProducts);

    app.get('/api/profile/:id/products/instore', ctrls.productCtrl.getInstorPrdsOf);

    app.get('/api/profile/:id/products/purchased', ctrls.productCtrl.getPurchasesOf);

    app.get('/api/profile/:id/products/sold', ctrls.productCtrl.getSoldPrdsOf);

    app.get('/api/profile/:id/apps', ctrls.appsCtrl.getInstalledApps);

}