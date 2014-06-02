/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initCtrl = function (models, agenda) {

    var investmentModel = models.investmentModel;
    var profileModel = models.profileModel;

    var transTypes = require(__base + "/constants").accounts.transTypes;
    var PROFIT_COLLECT_FREQ = require(__base + "/constants").investments.PROFIT_COLLECT_FREQ;

    agenda.every('3 minutes', 'loanProfitCollect');

    return new (function () {

        this.newInvestment = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profId = req.kexProfile.id, amount = req.query.amount, profit = req.query.profit;
            var transInfo = {
                type: transTypes.INVEST_ADD,
                object: null
            };
            profileModel.getMoney(profId, amount, transInfo, function moneyGetCB(_amount) {
                if (_amount != amount)
                    return res.json(Utils.genResponse("money retrieval error"));
                investmentModel.createInvestment(profId, amount, profit, function (err, doc) {
                    if (err || doc == null)
                        return cb(Utils.genResponse("investment creation error"));
                    res.json(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.investmentsOf = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profId = req.params.id;
            investmentModel.getInvestmentsOf(profId, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("Investments retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.rmInvestment = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profId = req.kexProfile.id, invstmntID = req.params.id;
            investmentModel.rmInvestmentByInvestor(profId, invstmntID, function (err, doc) {
                if (err || doc == null)
                    return res.json(Utils.genResponse("Investment removal failed"));
                var transInfo = {
                    type: transTypes.INVEST_REM,
                    object: invstmntID
                };
                profileModel.putMoney(doc.investor.id.toString(), doc.amount, transInfo, function moneyGive(success) {
                    if (!success)
                        return res.json(Utils.genResponse("failed to restore money"));
                    res.json(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.changeProfit = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var investorId = req.kexProfile.id, invstmntId = req.params.invId, newProfit = req.query.profit;
            investmentModel.changeProfit(investorId, invstmntId, newProfit, function (err, doc) {
                if (err)
                    return res.json(Utils.genResponse("Profit change failed"));
                res.json(Utils.genResponse(null, true, doc));
            });
        };

        this.getLoans = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profId = req.params.id;
            investmentModel.getLoans(profId, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("Loan retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        }

        this.getInvestors = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.kexProfile.id;
            investmentModel.getInvestors(profID, null, function (err, docs) {
                if (err)
                    return  res.json(Utils.genResponse("Investors retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        }

        this.payBack = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.kexProfile.id, invstmntID = req.params.invId;
            investmentModel.getInvestmentById(invstmntID, function getInvCB(err, doc) {
                if (err || doc == null)
                    return res.json(Utils.genResponse("invalid payback"));
                if (!(doc.debitor.id.toString() == profID))
                    return res.json(Utils.genResponse("invalid payback"));
                var transInfo = {
                    type: transTypes.LOANPAY,
                    object: invstmntID
                };
                profileModel.transferMoney(profID, doc.investor.id.toString(), doc.amount, transInfo, function (err, isSuccess) {
                    if (err)
                        return res.json(Utils.genResponse("money transfer error"));
                    investmentModel.rmInvestmentById(invstmntID, function removeInv(err, doc) {
                        if (err || !doc)
                            return res.json(Utils.genResponse("Investment could not be removed"));
                        res.json(Utils.genResponse(null, true));
                    });
                });
            });
        };

        this.takeLoan = function (req, res) {
            if (!req.kexProfile)
                return res.json(Utils.genResponse("Unauthorized"));
            var profID = req.kexProfile.id, invstmntID = req.params.invId;
            investmentModel.takeLoan(invstmntID, profID, function (err, numberAffected, rawResponse) {
                if (err || numberAffected < 1)
                    return res.json(Utils.genResponse("could not obtain money"));
                investmentModel.getInvestmentById(invstmntID, function getInvCB(err, doc) {
                    if (err || !doc)
                        return res.json(Utils.genResponse("invalid investment"));
                    var transInfo = {
                        type: transTypes.LOANGET,
                        object: invstmntID,
                        subject: doc.investor.id.toString()
                    }
                    profileModel.putMoney(doc.debitor.id.toString(), doc.amount, transInfo, function moneyGive(success) {
                        if (!success)
                            return res.json(Utils.genResponse("failed to put money"));
                        res.json(Utils.genResponse(null, true));
                    });
                });
            });
        };

        agenda.define('loanProfitCollect', function (job, done) {
            investmentModel.getAllLoans(function (err, docs) {
                if (err) return console.warn("could not get all loans to profit process");
                var lL = docs.length;
                var now = new Date();
                var mNow = now.getTime();
                for (var i = 0; i < lL; i++) {
                    var loan = docs[i];
                    var lastDate = new Date(loan.profit.lastDate);
                    if (mNow - lastDate.getTime() >= PROFIT_COLLECT_FREQ) {//collect profit
                        if (loan.profit.change && (new Date(loan.profit.change.date)).getTime() < mNow) {
                            loan.profit.amount = loan.profit.change.profit;
                            loan.profit.change = null;
                        }
                        var profit = loan.profit.amount;
                        var investorId = loan.investor.id.toString();
                        var debitorId = loan.debitor.id.toString();
                        var transInfo = {
                            type: transTypes.PROFIT,
                            object: {
                                amount: loan.amount,
                                id: loan.id
                            }
                        };
                        profileModel.transferMoney(debitorId, investorId, profit, transInfo, function (err, isSuccess) {
                            if (err || !isSuccess) {
                                if (err == "money retrieval error")loan.amount = loan.amount + profit;//add profit to loan
                                console.warn("loan " + loan.id + " profit transfer failed");
                            }
                            loan.profit.lastDate = new Date(lastDate.getTime() + PROFIT_COLLECT_FREQ);//last profit collect date (stabilize cycle)
                            loan.save();
                        });
                    }
                }
            });
            done();
        });

    })();

};