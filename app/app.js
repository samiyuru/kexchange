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
    var Agenda = require('agenda');
    var morgan = require('morgan');
    var express = require('express');
    var config = require('./config');
    global.__base = __dirname;

    var mongoose = require('mongoose');
    mongoose.connect(config.deployment.mongo, function (err) {
        if (err) {
            console.warn(err);
            return;
        }

        var agenda = new Agenda({
            db: {
                address: config.deployment.mongo,
                collection: 'agendaJobs'
            },
            concurrency: 10,
            processEvery: '30 minutes',
            defaultLockLifetime: 10000
        });
        agenda.start();

        function graceful() {
            agenda.stop(function () {
                process.exit(0);
            });
        }

        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);

        var accEvent = require('./services/EventService').init();
        var models = require('./Models')(mongoose, accEvent);
        var ctrls = require('./Controllers')(models, agenda);

        var app = express();
        app.use(morgan());
        app.use('/propics', express.static(__base + '/images/propics'));
        app.use('/productpics', express.static(__base + '/images/products'));
        app.use('/', express.static(__base + '/public'));//map static files routes.
        app.use('/admin', express.static(__base + '/admin'));//map static files routes.
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

        require(__base + '/routes').route(app, ctrls);

        app.listen(config.deployment.port, function () {
            console.log('Express server listening on port ' + config.deployment.port);
        });
    });
}