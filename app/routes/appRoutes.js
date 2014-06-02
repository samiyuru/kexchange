/**
 * Created by samiyuru on 6/1/14.
 */


module.exports.route = function (app, ctrls) {

    app.get('/apps', ctrls.appsCtrl.getApps);//by admin

    app.post('/apps/register', ctrls.appsCtrl.registerApp);//by admin

    app.post('/apps/unregister', ctrls.appsCtrl.unRegisterApp);//by admin

    app.get('/apps/:appId/install', ctrls.appsCtrl.installApp);//by user

    app.get('/apps/:appId/uninstall', ctrls.appsCtrl.uninstallApp);//by user

    app.post('/apps/:appId/moneytransfer', ctrls.appsCtrl.moneyTransfer);//by app

    app.post('/apps/:appId/users', ctrls.appsCtrl.getUsers);//by app

}