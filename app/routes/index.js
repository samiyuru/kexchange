var formidable = require('formidable');

module.exports.route = function (app, ctrls) {

    console.log("routing...");

    require('./profileRoutes').route(app, ctrls);
    require('./productsRoutes').route(app, ctrls);
    require('./investmentRoutes').route(app, ctrls);

    app.get('/api/plugins/reload', function (req, res) {

    });

};
