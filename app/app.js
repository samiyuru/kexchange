/**
 * Created by samiyuru on 4/16/14.
 */

//var cluster = require('cluster');

if (false /*cluster.isMaster  disabled clusters for debugging*/) {
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        // Replace the dead worker
        console.log('Worker ' + worker.id + ' died');
        cluster.fork();
    });
} else {
    var express = require('express');
    var http = require('http');
    var config = require('./config')();
    global.__base = __dirname;

    var mongoose = require('mongoose');
    mongoose.connect(config.mongo, function (err) {
        if (err) {
            console.warn(err);
            return;
        }

        var models = require('./Models')(mongoose);
        var ctrls = require('./Controllers')(models);

        var app = express();

        app.configure(function () {
            app.use(express.logger('dev'));
            app.use(express.methodOverride());
            app.use('/propics', express.static(__base + '/images/propics'));
            app.use('/productpics', express.static(__base + '/images/products'));
            app.use(express.static(__base + '/public'));//map static files routes. files needed to render index.html
            app.use(function (req, res, next) {//authentication
                var authToken = req.query.auth;
                if (!authToken) {
                    return next();
                }
                ctrls.profileCtrl.validateAuth(authToken, function (profile) {
                    req.kexProfile = profile;
                    next();
                });
            });
            app.use(app.routes);
        });

        require(__base + '/routes').route(app, ctrls);

        http.createServer(app).listen(config.port, function () {
            console.log('Express server listening on port ' + config.port);
            console.log('Tests started..');
            require('./Tests/tests').test(app, models, ctrls);
        });
    });
}