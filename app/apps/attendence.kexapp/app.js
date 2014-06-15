/**
 * Created by samiyuru on 6/15/14.
 */

var KEX_SERVER = "http://localhost:3000";
var appID = "";
var appSecret = "";

var express = require('express');

var app = express();
app.use(express.static('./public'));

app.get('/users', function (req, res) {

});

app.post('/pay', function (req, res) {

});

app.listen(4000, function () {
    console.log("attendance app started on port 4000 . . .");
});