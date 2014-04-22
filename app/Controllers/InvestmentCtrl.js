/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initCtrl = function (models) {

    var investmentModel = models.investmentModel;
    var profileModel = models.profileModel;

    return new (function (models) {

        this.newInvestment = function (profId, amount, profit, cb) {
            profileModel.getMoney(profId, amount, function moneyGetCB(_amount) {
                if (_amount != amount) {
                    cb(Utils.genResponse("money retrieval error"));
                    return;
                }
                investmentModel.createInvestment(profId, amount, profit, function (err, doc) {
                    if (err || doc == null) {
                        cb(Utils.genResponse("investment creation error"));
                        return;
                    }
                    cb(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.investmentsOf = function (profId, cb) {
            investmentModel.getInvestmentsOf(profId, function (err, docs) {
                if (err) {
                    cb(Utils.genResponse("Investments retrieval error"));
                    return;
                }
                cb(Utils.genResponse(null, true, docs));
            });
        };

        this.rmInvestment = function (profId, invstmntID, cb) {
            investmentModel.rmInvestmentByInvestor(profId, invstmntID, function (err, doc) {
                if (err || doc == null) {
                    cb(Utils.genResponse("Investment removal failed"));
                    return;
                }
                profileModel.putMoney(doc.investor.id, doc.amount, function moneyGive(success) {
                    if (!success) {
                        cb(Utils.genResponse("failed to restore money"));
                    }
                    cb(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.changeProfit = function (investorId, invstmntId, newProfit, cb) {
            investmentModel.changeProfit(investorId, invstmntId, newProfit, function (err, doc) {
                if (err) {
                    cb(Utils.genResponse("Profit change failed"));
                    return;
                }
                cb(Utils.genResponse(null, true, doc));
            });
        };

        this.getLoans = function (profId, cb) {
            investmentModel.getLoans(profId, function (err, docs) {
                if (err) {
                    cb(Utils.genResponse("Loan retrieval error"));
                    return;
                }
                cb(Utils.genResponse(null, true, docs));
            });
        }

        this.getInvestors = function (profID, cb) {
            investmentModel.getInvestors(profID, null, function (err, docs) {
                if (err) {
                    cb(Utils.genResponse("Investors retrieval error"));
                    return;
                }
                cb(Utils.genResponse(null, true, docs));
            });
        }

        this.payBack = function (profID, invstmntID, cb) {

            productModel.getProductById(productID, function getProductCB(err, product) {
                if (err || product == null) {
                    cb(Utils.genResponse("invalid product"));
                    return;
                }
                profileModel.transferMoney(profID, product.owner, product.price, function (err, isSuccess) {
                    if (err) {
                        cb(Utils.genResponse(err));
                        return;
                    }
                    productModel.purchase(profID, productID, product.price, function (err, numberAffected, rawResponse) {
                        if (err || numberAffected < 1) {
                            cb(Utils.genResponse("could not purchase"));
                            return;
                        }
                        cb(Utils.genResponse(null, true));
                    });
                });
            });

            investmentModel.getInvestmentById(invstmntID, function getInvCB(err, doc) {
                if (err || doc == null) {
                    cb(Utils.genResponse("invalid payback"));
                    return;
                }
                if (!(doc.debitor.id.toString() == profID)) {
                    cb(Utils.genResponse("invalid payback"));
                    return;
                }
                profileModel.transferMoney(profID, doc.investor.id, doc.amount, function (err, isSuccess) {
                    if (err) {
                        cb(Utils.genResponse("money transfer error"));
                        return;
                    }
                    investmentModel.rmInvestmentById(invstmntID, function removeInv(err, doc) {
                        if (err || doc == null) {
                            cb(Utils.genResponse("Investment could not be removed"));
                            return;
                        }
                        cb(Utils.genResponse(null, true));
                    });
                });
            });
        };

        this.takeLoan = function (invstmntID, profID, cb) {
            investmentModel.takeLoan(profID, invstmntID, function (err, numberAffected, rawResponse) {
                if (err || numberAffected < 1) {
                    cb(Utils.genResponse("could not obtain money"));
                    return;
                }
                cb(Utils.genResponse(null, true));
            });
        };

    })();

};