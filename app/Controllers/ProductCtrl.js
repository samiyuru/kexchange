/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var PRODUCT_IMG_DIR = __base + "/images/products/";

module.exports.initCtrl = function (models) {

    var productModel = models.productModel;
    var profileModel = models.profileModel;

    return new (function (models) {

        this.createProduct = function (profID, product, files, cb) {
            saveImages(files, function (err, fileNames) {
                if (err) {
                    cb(Utils.genResponse("file upload error"));
                    return;
                }
                productModel.createProduct(profID, product, fileNames, function (err, doc) {
                    if (err) {
                        cb(Utils.genResponse("product creation error error"));
                        return;
                    }
                    cb(Utils.genResponse(null, true, doc));
                });
            });
        };


        function saveImages(files, cb) {
            var fileNames = [];
            var fileCount = 0;//keep track of async file write
            var isFilesEmpty = true;
            var isPrevErr = false;//stop processing rem files if one goes wrong
            for (var key in files) {
                isFilesEmpty = false;
                fileCount++;
                var file = files[key];
                if (isPrevErr) return;//stop processing rem if one went wrong
                fs.readFile(file.path, function (err, data) {
                    if (isPrevErr) return;//stop processing rem if one went wrong
                    if (err) {
                        isPrevErr = true;
                        cb({err: "ERROR"});
                        return;
                    }
                    var fileName = uuid.v4() + path.extname(file.name);
                    if (isPrevErr) return;//stop processing rem if one went wrong
                    fs.writeFile(PRODUCT_IMG_DIR + fileName, data, function (err) {
                        if (isPrevErr) return;//stop processing rem if one went wrong
                        if (err) {
                            isPrevErr = true;
                            cb({err: "ERROR"});
                            return;
                        }
                        fileNames.push(fileName);
                        fileCount--;
                        if (fileCount == 0) {//all files have been written
                            cb(null, fileNames);
                            return;
                        }
                    });
                });
            }
            if (isFilesEmpty) {//if no files are present call CB
                cb(null, []);
            }
        }


    })();

};