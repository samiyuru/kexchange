/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initCtrl = function (models) {

    var investmentModel = models.investmentModel;
    var profileModel = models.profileModel;

    var transTypes = require(__base + "/constants").accounts.transTypes;

    return new (function (models) {

        this.newInvestment = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
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
                return res.json({});
            var profId = req.params.id;
            investmentModel.getInvestmentsOf(profId, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("Investments retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        };

        this.rmInvestment = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var profId = req.kexProfile.id, invstmntID = req.params.id;
            investmentModel.rmInvestmentByInvestor(profId, invstmntID, function (err, doc) {
                if (err || doc == null)
                    return res.json(Utils.genResponse("Investment removal failed"));
                var transInfo = {
                    type: transTypes.INVEST_REM,
                    object: invstmntID
                };
                profileModel.putMoney(doc.investor.id, doc.amount, transInfo, function moneyGive(success) {
                    if (!success)
                        return res.json(Utils.genResponse("failed to restore money"));
                    res.json(Utils.genResponse(null, true, doc));
                });
            });
        };

        this.changeProfit = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var investorId = req.kexProfile.id, invstmntId = req.params.invId, newProfit = req.query.profit;
            investmentModel.changeProfit(investorId, invstmntId, newProfit, function (err, doc) {
                if (err)
                    return res.json(Utils.genResponse("Profit change failed"));
                res.json(Utils.genResponse(null, true, doc));
            });
        };

        this.getLoans = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var profId = req.params.id;
            investmentModel.getLoans(profId, function (err, docs) {
                if (err)
                    return res.json(Utils.genResponse("Loan retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        }

        this.getInvestors = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
            var profID = req.kexProfile.id;
            investmentModel.getInvestors(profID, null, function (err, docs) {
                if (err)
                    return  res.json(Utils.genResponse("Investors retrieval error"));
                res.json(Utils.genResponse(null, true, docs));
            });
        }

        this.payBack = function (req, res) {
            if (!req.kexProfile)
                return res.json({});
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
                profileModel.transferMoney(profID, doc.investor.id, doc.amount, transInfo, function (err, isSuccess) {
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
                return res.json({});
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
                        subject: doc.investor.id
                    }
                    profileModel.putMoney(doc.debitor.id, doc.amount, transInfo, function moneyGive(success) {
                        if (!success)
                            return res.json(Utils.genResponse("failed to put money"));
                        res.json(Utils.genResponse(null, true));
                    });
                });
            });
        };

    })();

};