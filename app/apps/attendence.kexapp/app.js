/**
 * Created by samiyuru on 6/15/14.
 */

var KEX_SERVER = "http://localhost:3000";
var appID = "539b28f62d5a57100f00cfef";
var appSecret = "d467d305-2524-4532-9f9b-1398fa211067";
var adminCred = "";

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static('./public'));

app.get('/users', function (req, res) {
    var options = {
        method:'post',
        url: KEX_SERVER + "/apps/" + appID + "/users",
        json: true,
        headers: {
            secret: appSecret
        }
    };
    request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body);
        } else {
            res.json({
                err: "Could not get users list"
            });
        }
    });
});

app.post('/pay', function (req, res) {
    var options = {
        method:'post',
        url: KEX_SERVER + "/apps/" + appID + "/moneytransfer",
        json: true,
        headers: {
            secret: appSecret
        },
        body:req.body
    };
    request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body);
        } else {
            res.json({
                err: "Could not send money transfer"
            });
        }
    });
});

app.listen(4000, function () {
    console.log("attendance app started on port 4000 . . .");
});