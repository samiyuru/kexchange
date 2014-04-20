/**
 * Created by samiyuru on 4/15/14.
 */
kEX.service("kexProducts", function ($http, kexPofiles, kexEvent) {

    var kexProducts = this;

    var Product = function (prdObj) {
        var prdTypeImgs = [];
        prdTypeImgs[0] = '/img/prdtypes/tickets.png';
        prdTypeImgs[1] = '/img/prdtypes/share.png';
        prdTypeImgs[2] = '/img/prdtypes/review.png';
        prdTypeImgs[3] = '/img/prdtypes/help.png';

        var RECENT_BIDS_LIMIT = 4;
        var ALL_BIDS_LIMIT = 999999;

        this.id = prdObj._id;
        this.title = prdObj.title;
        this.qty = prdObj.qty;
        this.remQty = prdObj.remQty;
        this.owner = prdObj.owner;
        this.price = prdObj.price || 0;
        this.isAuction = prdObj.isAuction;
        this.type = prdObj.type;
        this.bidRank = null;
        this.bidsLimit = RECENT_BIDS_LIMIT;
        this.bids = [];
        var bids = prdObj.bids;
        var bidLen = bids.length;
        for (var i = 0; i < bidLen; i++) {
            var bid = bids[i];
            if (!this.bidRank && bid.person._id == kexPofiles.getLoggedProf()._id) this.bidRank = i + 1;
            this.bids.push({
                person: bid.person,
                bid: bid.bid,
                date: new Date(bid.date)
            });
        }
        this.expire = new Date(prdObj.expire);
        this.detail = prdObj.detail;
        this.dateAdded = new Date(prdObj.date);
        this.imgs = prdObj.imgs;
        this.prdCover = prdTypeImgs[prdObj.type];

        this.ui = {
            newBid: ""
        };

        this.isTaken = false;//is a purchased or bidded product (required for the event when taken)

        this.updateBidRank();

        this.showAllBids = function () {
            this.bidsLimit = ALL_BIDS_LIMIT;
        };

        this.showRecentBids = function () {
            this.bidsLimit = RECENT_BIDS_LIMIT;
        };

        this.isRecentBids = function () {//returns true if only recent bids are shown
            return (this.bidsLimit == RECENT_BIDS_LIMIT);
        };
    };

    Product.prototype.addBidToTop = function (person, date, bid) {
        this.bids.unshift({
            person: person,
            bid: bid,
            date: date
        });
        this.price = bid;
    };

    Product.prototype.updateBidRank = function () {
        var loggedProfile = kexPofiles.getLoggedProf();
        var bidLen = this.bids.length;
        for (var i = 0; i < bidLen; i++) {
            var bid = this.bids[i];
            if (bid.person._id == loggedProfile._id) {
                this.bidRank = i + 1;
                return;
            }
        }
    }

    Product.prototype.placeBid = function () {
        if (!this.isAuction)return;
        var newBid = this.ui.newBid;
        var now = new Date();
        if (this.bids.length > 0 && this.bids[0].bid >= newBid) return;//newBids must be greater than existing bids

        kexProducts.placeBid(this.id, newBid, (function (status) {
            if (status.success) {
                this.addBidToTop(kexPofiles.getLoggedProf(), now, newBid);
                this.bidRank = 1;//most recent bid is mine so rank = 1
                this.ui.newBid = "";//clear bid field if success
                if (!this.isTaken) {
                    this.isTaken = true;
                    kexEvent.publish(PRODUCT_TAKEN_EVENT, this);
                }
            }
        }).bind(this));
    };

    Product.prototype.purchase = function (newBid) {
        if (this.isAuction)return;
        kexProducts.purchase(this.id, function (status) {
            if (status.success) {
            
            }
        });
    };

    this.Product = Product;

    //-----------------------------------------------

    this.createProduct = function (isAuction, type, name, detail, qty, price, expire, imgs, cb) {
        var formData = new FormData();
        formData.append("type", type);
        formData.append("name", name);
        formData.append("detail", detail);
        formData.append("qty", qty);
        formData.append("price", price);
        formData.append("expire", expire);
        formData.append("isauction", (isAuction) ? 1 : 0);
        var imgLen = imgs.length;
        for (var i = 0; i < imgLen; i++) {
            formData.append("img_" + i, imgs[i]);
        }
        $http({
            method: "POST",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            data: formData,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity,
            url: "/api/products/"
        }).success(function (data) {
                cb(data);
            });
    }

    this.getProductsOf = function (profID, isAuction, cb) {
        $http({
            method: "GET",
            params: {
                isauction: isAuction,
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + kexPofiles.getLoggedProf()._id + "/products"
        }).success(function (data) {
                cb(data);
            });
    }


    this.getProducts = function (isAuction, cb) {
        $http({
            method: "GET",
            params: {
                isauction: isAuction,
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/products"
        }).success(function (data) {
                cb(data);
            });
    }

    this.placeBid = function (productID, newBid, cb) {
        $http({
            method: "POST",
            params: {
                auth: kexPofiles.getAuthToken(),
                bid: newBid
            },
            url: "/api/products/" + productID + "/bid"
        }).success(function (data) {
                cb(data);
            });
    };


    this.getBidedProducts = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + profID + "/bids"
        }).success(function (data) {
                cb(data);
            });
    };

    this.purchase = function (productID, cb) {
        $http({
            method: "POST",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/products/" + productID + "/purchase"
        }).success(function (data) {
                cb(data);
            });
    };

});