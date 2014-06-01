/**
 * Created by samiyuru on 6/1/14.
 */


module.exports.route = function (app, ctrls) {

    app.post('/apps/register', ctrls.appsCtrl.registerApp);//by admin

    app.post('/apps/unregister', ctrls.appsCtrl.unRegisterApp);//by admin

    app.post('/apps/:appId/install', ctrls.appsCtrl.installApp);//by user

    app.post('/apps/:appId/uninstall', ctrls.appsCtrl.uninstallApp);//by user

    app.post('/apps/:appId/moneytransfer', ctrls.appsCtrl.moneyTransfer);//by app

}