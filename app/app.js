var express = require('express');
var http = require('http');

var app = express();

app.set('port', 3000);
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.static('./public'));//map static files routes. files needed to render index.html
app.use(app.routes);


require('./routes').route(app);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    console.log('Tests started..');
    require('./Tests/tests').test(app);
});
