/**
 * Created by samiyuru on 5/15/14.
 */

kEX.service("kexProductTypes", function (kexPofiles) {

    var ProductBase = function (prdObj) {
        var prdTypeImgs = [];
        prdTypeImgs[0] = '/img/prdtypes/tickets.png';
        prdTypeImgs[1] = '/img/prdtypes/share.png';
        prdTypeImgs[2] = '/img/prdtypes/review.png';
        prdTypeImgs[3] = '/img/prdtypes/help.png';
        prdTypeImgs[4] = '/img/prdtypes/product.png';
        this.id = prdObj._id;
        this.title = prdObj.title;
        this.qty = prdObj.qty;
        this.remQty = prdObj.remQty;
        this.owner = prdObj.owner;
        this.price = prdObj.price || 0;
        this.isAuction = null;
        this.type = prdObj.type;
        this.expire = new Date(prdObj.expire);
        this.detail = prdObj.detail;
        this.purchases = prdObj.purchases;
        this.dateAdded = new Date(prdObj.date);
        this.imgs = prdObj.imgs;
        this.prdCover = prdTypeImgs[this.type];
        this.delegate = null;
        this.ui = {
            showInfo: false
        };
    };

    ProductBase.prototype.showInfo = function () {
        this.ui.showInfo = true;
    };

    ProductBase.prototype.hideInfo = function () {
        this.ui.showInfo = false;
    };

    //-----------------------------------------------

    var AuctionProduct = function (prdObj) {
        ProductBase.apply(this, [prdObj]);
        this.isAuction = true;
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
        this.newBid = "";
        this.updateBidRank();
    }

    AuctionProduct.prototype = Object.create(ProductBase.prototype);

    AuctionProduct.prototype.addBidToTop = function (person, date, bid) {
        this.bids.unshift({
            person: person,
            bid: bid,
            date: date
        });
        this.price = bid;
    };

    AuctionProduct.prototype.updateBidRank = function () {
        var loggedProfile = kexPofiles.getLoggedProf();
        var bidLen = this.bids.length;
        var rank = 0;
        var prevIds = {};
        for (var i = 0; i < bidLen; i++) {
            var bid = this.bids[i];
            if (bid.person._id == loggedProfile._id) {
                this.bidRank = rank + 1;
                return;
            }
            if (!prevIds[bid.person._id]) {
                prevIds[bid.person._id] = true;
                rank++;
            }
        }
    }

    AuctionProduct.prototype.placeBid = function () {
        this.delegate.initBid(this);
    };

    //-----------------------------------------------

    var FixedProduct = function (prdObj) {
        ProductBase.apply(this, [prdObj]);
        this.isAuction = false;
        this.ui.purchConf = false;
    }

    FixedProduct.prototype = Object.create(ProductBase.prototype);

    FixedProduct.prototype.showPurchConf = function () {
        this.ui.purchConf = true;
    };

    FixedProduct.prototype.hidePurchConf = function () {
        this.ui.purchConf = false;
    };

    FixedProduct.prototype.purchase = function () {
        this.delegate.purchase(this);
    };

    //-----------------------------------------------

    var BiddedProductDeco = function (auctionObj) {
        var Decorated = function () {
            this.ui.showbids = false;
            this.ui.showInfo = false;
            this.isBidded = true;
        };

        Decorated.prototype = auctionObj;

        Decorated.prototype.placeBid = function () {
            this.delegate.placeBid(this);
        }

        Decorated.prototype.showInfo = function () {
            this.ui.showInfo = true;
            this.ui.showbids = false;
        };

        Decorated.prototype.hideInfo = function () {
            this.ui.showInfo = false;
        };

        Decorated.prototype.showBids = function () {
            this.ui.showInfo = false;
            this.ui.showbids = true;
        };

        Decorated.prototype.hideBids = function () {
            this.ui.showbids = false;
        };

        return new Decorated();
    };

    //----------------------------------------------

    var BoughtProduct = function (prdObj, buyerId) {
        ProductBase.apply(this, [prdObj]);
        var purchs = this.purchases;
        var pL = purchs.length;
        for (var j = 0; j < pL; j++) {
            var purch = purchs[j];
            purch.date = new Date(purch.date);
            if (purch.buyer == buyerId) {
                this.purchased = purch;
                this.purchases = undefined;
                break;
            }
        }
    }

    BoughtProduct.prototype = Object.create(ProductBase.prototype);
//----------------------------------------------

    this.ProductBase = ProductBase;
    this.AuctionProduct = AuctionProduct;
    this.FixedProduct = FixedProduct;
    this.BiddedProductDeco = BiddedProductDeco;
    this.BoughtProduct = BoughtProduct;

});