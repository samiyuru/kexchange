var express = require('express');
var http = require('http');
var config = require('./config')();
global.__base = __dirname;

var app = express();


app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use('/propics', express.static(__base + '/images/propics'));
    app.use('/productpics', express.static(__base + '/images/products'));
    app.use(express.static(__base + '/public'));//map static files routes. files needed to render index.html
    app.use(app.routes);
});

var mongoose = require('mongoose');
mongoose.connect(config.mongo, function (err) {
    if (err) {
        console.warn(err);
        return;
    }

    var models = require('./Models')(mongoose);

    var ctrls = require('./Controllers')(models);

    require(__base + '/routes').route(app, ctrls);

    http.createServer(app).listen(config.port, function () {
        console.log('Express server listening on port ' + config.port);
        console.log('Tests started..');
        require('./Tests/tests').test(app, models, ctrls);
    });
});
