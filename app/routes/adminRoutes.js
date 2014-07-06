/**
 * Created by samiyuru on 7/6/14.
 */


module.exports.route = function (app, ctrls) {

    app.get('/admin/apps', ctrls.appsCtrl.getAppsAdmin);//by admin

    app.post('/admin/register-app', ctrls.appsCtrl.registerApp);//by admin

    app.post('/admin/unregister-app', ctrls.appsCtrl.unRegisterApp);//by admin

    app.post('/admin/validate', ctrls.adminCtrl.validateAdmin);//by admin

}