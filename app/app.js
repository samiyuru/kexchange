var express = require('express');
var http = require('http');

var app = express();

app.set('port', 3000);
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.static('./public'));//map static files routes. files needed to render index.html
app.use('/images/propics', express.static('./images/propics'));
app.use(app.routes);


require('./routes').routes(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
