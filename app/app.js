var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config')();

var app = express();

app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use('/propics', express.static('images/propics'));
app.use(express.static('./public'));//map static files routes. files needed to render index.html
app.use(app.routes);


var mongoose = require('mongoose');
mongoose.connect(config.mongo, function (err) {
    if (err) {
        console.warn(err);
        return;
    }

    var models = require('./Models')(mongoose);

    var ctrls = require('./Controllers')(models);

    require('./routes').route(app, ctrls);

    http.createServer(app).listen(config.port, function () {
        console.log('Express server listening on port ' + config.port);
        console.log('Tests started..');
        require('./Tests/tests').test(app, models, ctrls);
    });
});