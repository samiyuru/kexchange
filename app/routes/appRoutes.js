/**
 * Created by samiyuru on 6/1/14.
 */


module.exports.route = function (app, ctrls) {

    app.get('/apps', ctrls.appsCtrl.getAppsUser);//by user

    app.get('/apps/user-earnings', ctrls.appsCtrl.getUserEarnings);//by user

    app.get('/apps/:appId', ctrls.appsCtrl.redirectToApp);//by user

    app.get('/apps/:appId/install', ctrls.appsCtrl.installApp);//by user

    app.get('/apps/:appId/uninstall', ctrls.appsCtrl.uninstallApp);//by user

    app.post('/apps/:appId/money-transfer', ctrls.appsCtrl.moneyTransfer);//by app

    app.post('/apps/:appId/users', ctrls.appsCtrl.getUsers);//by app

    app.get('/apps/:appId/:userKey', ctrls.appsCtrl.getUserForKey);//by app

}