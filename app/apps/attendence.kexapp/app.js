/**
 * Created by samiyuru on 6/15/14.
 */

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var CryptoJS = require('./md5');


var KEX_SERVER = "http://localhost:3000";
var appID = "53baaa6ec3e460b7169aae09";
var appSecret = "66583de1-488a-42d4-8a17-d110ce3bea43";

var admin = {
    username: 'admin',
    password: 'attadmin'
};
var adminCredentials = CryptoJS.MD5(admin.username + admin.password).toString();

var app = express();
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(function (req, res, next) {//authentication
    req.isAdmin = function () {
        return adminCredentials === req.headers.auth;
    }
    next();
});

app.post('/authenticate', function (req, res) {
    if (req.isAdmin()) {
        res.json({success: true});
    } else {
        res.json({err: 'unauthorized'});
    }
});

app.get('/users', function (req, res) {
    if (!req.isAdmin())
        res.json({err: 'unauthorized'});
    var options = {
        method: 'post',
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
    if (!req.isAdmin())
        res.json({err: 'unauthorized'});
    var options = {
        method: 'post',
        url: KEX_SERVER + "/apps/" + appID + "/money-transfer",
        json: true,
        headers: {
            secret: appSecret
        },
        body: req.body
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