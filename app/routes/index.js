/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.route = function (app, ctrls) {

    console.log("routing...");

    require('./profileRoutes').route(app, ctrls);

    require('./productsRoutes').route(app, ctrls);

    require('./investmentRoutes').route(app, ctrls);

    require('./appRoutes').route(app, ctrls);

    require('./adminRoutes').route(app, ctrls);

};
