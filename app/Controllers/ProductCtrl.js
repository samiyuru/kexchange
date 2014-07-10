/**
 * Created by samiyuru on 4/4/14.
 */
var formidable = require('formidable');
var Utils = require(__base + "/utils");
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var PRODUCT_IMG_DIR = __base + "/images/products/";

module.exports.initCtrl = function (models, agenda) {

    var productModel = models.productModel;
    var profileModel = models.profileModel;

    var transTypes = require(__base + "/constants").accounts.transTypes;

    return new (function () {

        this.getBidedProducts = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.params.id;
            productModel.getBidedProducts(profID, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("Bids retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.placeBid = function (req, res) {
            var profID, productID, amount, rqAmount;

            function onProduct(err, product) {
                if (err || product == null)
                    return res.json(Utils.genResponse("invalid product"));
                if(product.price >= amount){
                    return res.json(Utils.genResponse("bid amount is less than the required minimum bid"));
                }
                var transInfo = {
                    type: transTypes.BID_PLACE,
                    object: {
                        title: product.title,
                        id: productID
                    }
                };
                rqAmount = amount;
                var bl = product.bids.length;
                for (var i = 0; i < bl; i++) {
                    var bid = product.bids[i];
                    if (bid.person == profID) {
                        rqAmount -= bid.bid;//deduct prev bid price
                        break;
                    }
                }
                profileModel.getMoney(profID, rqAmount, transInfo, onMoneyGet);
            }

            function onMoneyGet(gotAmount) {
                if (gotAmount != rqAmount)
                    return res.json(Utils.genResponse("money retrieval error"));
                productModel.placeBid(profID, productID, amount, onBid);
            }

            function onBid(err, numberAffected, rawResponse) {
                if (err || numberAffected < 1)
                    return res.json(Utils.genResponse("could not place bid"));
                res.json(Utils.genResponse(null, true));
            }

            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            profID = req.kexProfile.id, productID = req.params.prdId, amount = req.query.bid;
            productModel.getProductById(productID, onProduct);

        };

        this.purchase = function (req, res) {//buy fixed price product
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.kexProfile.id, productID = req.params.prdId;
            productModel.getProductById(productID, function getProductCB(err, product) {
                if (err || product == null)
                    return res.json(Utils.genResponse("invalid product"));
                var transInfo = {
                    type: transTypes.PRODUCT,
                    object: {
                        title: product.title,
                        id: productID
                    }
                };
                profileModel.transferMoney(profID, product.owner.toString(), product.price, transInfo, function (err, isSuccess) {
                    if (err)
                        return res.json(Utils.genResponse(err));
                    productModel.purchase(profID, productID, product.price, function (err, numberAffected, rawResponse) {
                        if (err || numberAffected < 1)
                            return res.json(Utils.genResponse("could not purchase"));
                        res.json(Utils.genResponse(null, true));
                    });
                });
            });
        };

        this.getProductsFor = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.kexProfile.id, isAuction = req.query.isauction, chunk = null;
            productModel.getProductsFor(profID, isAuction, chunk, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("products retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.getInstorPrdsOf = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.params.id, isAuction = req.query.isauction, chunk = null;
            productModel.getInstorPrdsOf(profID, isAuction, chunk, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("products retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.getPurchasesOf = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.params.id, isAuction = req.query.isauction, chunk = null;
            productModel.getPurchasesOf(profID, isAuction, chunk, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("products retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.getSoldPrdsOf = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.params.id, isAuction = req.query.isauction, chunk = null;
            productModel.getSoldPrdsOf(profID, isAuction, chunk, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("products retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.createProduct = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var profID = req.kexProfile.id, product = fields, files = files;
                saveImages(files, function (err, fileNames) {
                    if (err)
                        return res.json(Utils.genResponse("file upload error"));
                    productModel.createProduct(profID, product, fileNames, function (err, doc) {
                        if (err)
                            return res.json(Utils.genResponse("product creation error"));
                        res.json(Utils.genResponse(null, true, doc));
                        agenda.schedule(new Date((new Date()).getTime() + 25 * 60 * 1000), "productExpire", {id: doc.id});//schedule expire
                    });
                });
            });
        };

        agenda.define('productRemove', function (job, done) {
            var prdId = job.attrs.data.id;
            productModel.removeProductById(prdId, function (err, doc) {
                if (err) return console.warn("failed to remove product");
            });
            done();
        });

        agenda.define('productExpire', function (job, done) {
            var prdId = job.attrs.data.id;
            productModel.getProductById(prdId, function (err, doc) {
                if (err)return console.warn("failed to get product");
                if (doc.isAuction == true) {
                    processBids(doc)
                }
                if (doc.purchases.length === 0) {//remove pproduct if no purchases
                    productModel.removeProductById(prdId, function (err, doc) {
                        if (err) return console.warn("failed to remove product");
                    });
                } else {
                    agenda.schedule("15 minutes", "productRemove", {id: doc.id});
                }
            });
            done();
        });

        function processBids(product) {
            function giveMoney(product, bid) {
                var transInfo = {
                    type: transTypes.PRODUCT,
                    object: {
                        title: product.title,
                        id: product.id
                    },
                    subject: bid.person.toString()
                };
                profileModel.putMoney(product.owner.toString(), bid.bid, transInfo, function (success) {
                    if (!success)console.warn("failed to pay " + bid.bid + " for product " + product.id + " of " + product.owner.toString());
                });
            }

            var bids = product.bids;//bids are sorted desc
            var bL = bids.length;
            var selected = {};
            var selCnt = 0;

            for (var i = 0; i < bL; i++) {
                var bid = bids[i];
                if (selCnt < product.qty) {
                    if (!selected[bid.person]) {
                        selected[bid.person] = true;
                        selCnt++;
                        product.purchases.push({
                            price: bid.bid,
                            buyer: bid.person,
                            date: bid.date
                        });
                        giveMoney(product, bid);
                    }
                } else {
                    var bidReturned = {};
                    if (!selected[bid.person] && !bidReturned[bid.person]) {
                        var transInfo = {
                            type: transTypes.BID_RETURN,
                            object: {
                                title: product.title,
                                id: product.id
                            }
                        };
                        profileModel.putMoney(bid.person.toString(), bid.bid, transInfo, function (success) {
                            if (!success)console.warn("failed to refund " + bid.bid + " bid to " + bid.person);
                        });
                        bidReturned[bid.person] = true;
                    }
                }
            }

            product.soldQty = selCnt;
            product.remQty = product.qty - selCnt;
            product.save();
        }

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
                        return cb({err: "ERROR"});
                    }
                    var fileName = uuid.v4() + path.extname(file.name);
                    if (isPrevErr) return;//stop processing rem if one went wrong
                    fs.writeFile(PRODUCT_IMG_DIR + fileName, data, function (err) {
                        if (isPrevErr) return;//stop processing rem if one went wrong
                        if (err) {
                            isPrevErr = true;
                            return cb({err: "ERROR"});
                        }
                        fileNames.push(fileName);
                        fileCount--;
                        if (fileCount == 0) {//all files have been written
                            return cb(null, fileNames);
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