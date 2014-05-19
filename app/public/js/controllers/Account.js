/**
 * Created by samiyuru on 5/19/14.
 */

kEX.controller("accountCtrl", function ($scope, kexPofiles) {

    var accLogs = [
        {
            detail: "Loan from Saman",
            time: new Date(),
            amount: 300,
            balance: 3000
        }
    ];

    var transTypes = {
        EARNING: 0, // +
        TAX: 1,     // -
        LOANGET: 7, // +
        INVEST_ADD: 2,  // -
        INVEST_REM: 3,  // +
        PROFIT: 4,  // affects 2 people + -
        PRODUCT: 5, // affects 2 people + -
        LOANPAY: 6   // affects 2 people + -
    };

    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        accLogs.length = 0;//clear existing acc logs
        var profID = profile._id;
        kexPofiles.loadAccounts(profID, function (status) {
            if (status.success) {
                var logArr = status.data;
                var len = logArr.length;
                for (var i = 0; i < len; i++) {
                    var logItm = logArr[i];
                    switch (logItm.type) {
                        case transTypes.EARNING:
                        {
                            logItm.detail = "External earning";
                            break;
                        }
                        case transTypes.TAX:
                        {
                            logItm.detail = "Tax payment";
                            break;
                        }
                        case transTypes.LOANGET:
                        {
                            logItm.detail = "Money taken from ";
                            break;
                        }
                        case transTypes.INVEST_ADD:
                        {
                            logItm.detail = "Money Investment";
                            break;
                        }
                        case transTypes.INVEST_REM:
                        {
                            logItm.detail = "Investment withdrawal";
                            break;
                        }
                        case transTypes.PRODUCT:
                        {
                            logItm.detail = (logItm.amount > 0) ? "Product sold to " : "Product bought from ";
                            break;
                        }
                        case transTypes.PROFIT:
                        {
                            logItm.detail = (logItm.amount > 0) ? "Investment profit from " : "Investment profit to ";
                            break;
                        }
                        case transTypes.LOANPAY:
                        {
                            logItm.detail = (logItm.amount > 0) ? "Money payback by " : "Money payback to ";
                            break;
                        }
                    }
                    accLogs.push(logItm);
                }
            } else {
                alert(status.err);
            }
        });
    });

    $scope.accLogs = accLogs;
    $scope.transTypes = transTypes;
});