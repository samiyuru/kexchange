/* 
 * Samiyuru Senarathne
 */

kEX.controller("kexroot", function ($scope, $rootScope, $location, kexPofiles) {

});

kEX.controller("prdctsCtrlr", function ($scope) {
    $scope.products = [
        {
            id: 0002,
            name: "Domain driven development session",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        },

        {
            id: 0002,
            name: "Session Tickets",
            left: 2,
            prdcover: "product-cover001.png",
            seller: {
                id: 0001,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            }
        }
    ];
});

kEX.controller("recntErnngsCtrlr", function ($scope) {
    $scope.ernngs = [
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        },
        {
            head: "Blogger Earning",
            amount: 100,
            detail: "For the blogger you mentioned",
            srcimg: "earning-ico001.png",
            timeago: "Yesterday",
            link: "#",
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic02.png"
            }
        }
    ];
});

kEX.controller("topErnrsCtrlr", function ($scope) {
    $scope.tpErners = [
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 01
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 02
        },
        {
            person: {
                id: 0001,
                wealth: 3000,
                shname: "Samiyuru",
                name: "Samiyuru Senarathne",
                propic: "propic01.png"
            },
            earning: 10000,
            place: 03
        }
    ];
});

kEX.controller("tpWlthyCtrler", function ($scope, kexPofiles) {
    $scope.wlthyPrsns = wlthyPrsns = [];

    kexPofiles.loadProfiles(function loadWlthyPplCB(data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            wlthyPrsns.push(data[i]);
        }
    });

});

kEX.controller("coverCtrlr", function ($scope) {
    $scope.name = "Samiyuru Senarathne";
    $scope.status = "Millionaire";
    $scope.balance = 10000;
    $scope.loan = 5000;
    $scope.propic = "propic01.png";
});

kEX.controller("accountCtrl", function ($scope) {
    $scope.accLogs = [
        {
            detail: "Loan from Saman",
            timeago: "1 month ago",
            amount: 300,
            balance: 3000
        },
        {
            detail: "Blog earning",
            timeago: "2 days ago",
            amount: 800,
            balance: 6000
        },
        {
            detail: "Investment in Gayan",
            timeago: "1 week ago",
            amount: 200,
            balance: 7000
        },
        {
            detail: "Loan from Saman",
            timeago: "1 day ago",
            amount: 300,
            balance: 3300
        },
        {
            detail: "Loan from Saman",
            timeago: "1 min ago",
            amount: 200,
            balance: 9000
        },
        {
            detail: "Loan from Saman",
            timeago: "1 hour ago",
            amount: 800,
            balance: 6000
        },
        {
            detail: "Loan from Anil",
            timeago: "1 day ago",
            amount: 40,
            balance: 1000
        }
    ];
});

kEX.controller("loanCtrl", function ($scope, kexInvest, kexPofiles) {
    var _curProfID = null;//currently loaded profile id
    $scope.showInvestButt = true;
    $scope.showInvests = false;
    var investors, loans;
    $scope.investors = investors = [];
    $scope.loans = loans = [];

    var Investor = function (id, amount, date, profit, profitMod, investor, debitor) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.profit = profit;
        this.profitMod = profitMod;
        this.investor = investor;
        this.debitor = debitor;
        this.ui = {
            isTake: false
        };
    };

    Investor.prototype.take = function () {
        kexInvest.takeLoan(this.id, (function (status) {
            if (status.success) {
                loans.unshift(new Loan(this.id, this.amount, this.profitMod, this.investor, kexPofiles.getLoggedProf()));
                removeInvestment(this.id);
            }
            this.ui.isTake = false;//hide take it confirmation
        }).bind(this));
    };

    //--------------------------------------

    var Loan = function (id, amount, date, profit, profitMod, investor, debitor) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.profit = profit;
        this.profitMod = profitMod;
        this.investor = investor;
        this.debitor = debitor;
        this.ui = {
            isPayback: false
        };
    };

    Loan.prototype.payBack = function () {
        kexInvest.payBack(this.id, (function (status) {
            if (status.success) {
                removeLoan(this.id);
            }
            this.ui.isPayback = false;//hide payback confirmation
        }).bind(this));
    };

    //----------------------------------

    loadLoans(kexPofiles.getCurrentProfpageID());//initial profile //loaded to profile or reload
    kexPofiles.onProfileChange(loadLoans);//profile change event

    //----------------------------------

    loadInvestors();//initial profile //loaded to profile or reload

    //----------------------------------
    function removeInvestment(invID) {
        var len = investors.length;
        for (var i = 0; i < len; i++) {
            if (investors[i].id == invID) {
                investors.splice(i, 1);
                return;
            }
        }
    }

    function removeLoan(loanID) {
        var len = loans.length;
        for (var i = 0; i < len; i++) {
            if (loans[i].id == loanID) {
                loans.splice(i, 1);
                return;
            }
        }
    }

    function loadLoans(profID) {
        if (profID == kexPofiles.getLoggedProf().id) {
            $scope.showInvestButt = true;//show 'Need money' button
        } else {
            $scope.showInvestButt = false;//hide 'Need money' button
        }
        if (_curProfID != profID) {
            $scope.investments = investments = [];
            kexInvest.loadLoans(profID, function loadInvestCB(docs) {
                var len = docs.length;
                for (var i = 0; i < len; i++) {
                    var doc = docs[i];
                    //id, amount, date, profit, profitMod, investor, debitor
                    var profitMod = null;
                    if (doc.profit.change) {
                        var _change = doc.profit.change;
                        profitMod = {
                            profit: _change.profit,
                            date: new Date(_change.date)
                        };
                    }
                    var obj = new Loan(doc._id, doc.amount, new Date(doc.debitor.date), profitMod, doc.investor.id, kexPofiles.getLoggedProf());
                    loans.push(obj);
                }
                _curProfID = profID;
            });
        }
    }

    function loadInvestors() {
        $scope.investments = investments = [];
        kexInvest.loadInvestors(function loadInvestCB(docs) {
            var len = docs.length;
            for (var i = 0; i < len; i++) {
                var doc = docs[i];
                //id, amount, date, profit, profitMod, investor, debitor
                var obj = new Investor(doc._id, doc.amount, new Date(doc.investor.date), null, doc.investor.id, kexPofiles.getLoggedProf());
                investors.push(obj);
            }
        });
    }

});

kEX.controller("myInvestCtrl", function ($scope, kexInvest, kexPofiles) {

    $scope.ui = ui = {
        isShowNwInvest: false
    };

    var _curProfID = null;//currently loaded profile id
    var investments;
    $scope.investments = investments = [];

    $scope.newInvest = newInvest = {
        amount: "",
        profit: ""
    };

    //----------------------------------

    loadMyInvestments(kexPofiles.getCurrentProfpageID());//initial profile //loaded to profile or reload
    kexPofiles.onProfileChange(loadMyInvestments);//profile change event

    //----------------------------------

    var Investment = function (id, amount, date, profit, profitMod, investor, debitor) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.profit = profit;
        this.profitMod = profitMod;
        this.investor = investor;
        this.debitor = debitor;
        this.ui = {
            isPrftMod: false,
            isRmv: false,
            modPrft: ""
        };
    };

    Investment.prototype.modProfit = function (newProft) {
        kexInvest.modProfit(this.id, newProft, (function (doc) {
            if (!doc.profit.change) {
                this.profitMod = null;
                this.profit = doc.profit.amount;
            } else {
                this.profitMod = {
                    profit: doc.profit.change.profit,
                    date: new Date(doc.profit.change.date)//in effect after this date
                };
            }
            this.ui.isPrftMod = false;//hide profit mod inputs
            this.ui.modPrft = "";//clear mod input
        }).bind(this));
    }

    Investment.prototype.delete = function () {
        kexInvest.deleteInvest(this.id, function (data) {
            deleteInv(data._id);
        });
    }

    //----------------------------------

    function convertDocToInv(doc) {
        var debitor = null, dispDate;
        if (doc.debitor) {
            var _debitor = doc.debitor.id
            debitor = {
                name: _debitor.name,
                shname: _debitor.nickname,
                propic: _debitor.propic,
                id: _debitor._id
            }
            dispDate = new Date(doc.debitor.date)
        } else {
            dispDate = new Date(doc.investor.date)
        }
        var profitMod = null;
        if (doc.profit.change) {
            var _change = doc.profit.change;
            profitMod = {
                profit: _change.profit,
                date: new Date(_change.date)//in effect after this date
            };
        }
        var invObj = new Investment(doc._id, doc.amount, dispDate, doc.profit.amount, profitMod, kexPofiles.getLoggedProf(), debitor);
        return invObj;
    }

    function loadMyInvestments(profID) {
        if (_curProfID != profID) {
            $scope.investments = investments = [];
            kexInvest.loadMyInvestments(profID, function loadInvestCB(data) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var obj = convertDocToInv(data[i]);
                    investments.push(obj);
                }
                _curProfID = profID;
            });
        }
    }

    function hideNewInvest() {
        newInvest.amount = "";
        newInvest.profit = "";
        ui.isShowNwInvest = false;
    }

    $scope.investMoney = function () {
        kexInvest.investMoney(newInvest, function newInvestCB(data) {//data format from server is different from normal investment format
            var invObj = new Investment(data._id, data.amount, new Date(), data.profit, null, kexPofiles.getLoggedProf(), null);
            investments.unshift(invObj);
        });
        hideNewInvest();
    };

    function deleteInv(invID) {
        var len = investments.length;
        for (var i = 0; i < len; i++) {
            if (investments[i].id == invID) {
                investments.splice(i, 1);
                return;
            }
        }
    }

});

kEX.controller("newPrdCtrl", function ($scope) {

});

kEX.controller("mybidsctrl", function ($scope) {

});