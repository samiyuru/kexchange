/**
 * Created by samiyuru on 4/17/14.
 */

kEX.controller("prdctsCtrlr", function ($scope, kexProducts) {
    var _curProfID = null;
    var products = [];
    var prdTypeImgs = [];
    prdTypeImgs[0] = '/img/prdtypes/tickets.png';
    prdTypeImgs[1] = '/img/prdtypes/share.png';
    prdTypeImgs[2] = '/img/prdtypes/review.png';
    prdTypeImgs[3] = '/img/prdtypes/help.png';

    //-----------------------------------------------

    $scope.products = products;

    //-----------------------------------------------

    var Product = function (prdObj) {
        this.id = prdObj._id;
        this.title = prdObj.title;
        this.qty = prdObj.qty;
        this.remQty = prdObj.remQty;
        this.owner = prdObj.owner;
        this.price = prdObj.price || 0;
        this.isAuction = prdObj.isAuction;
        this.type = prdObj.type;
        this.bids = [];
        var bids = prdObj.bids;
        for (var i in bids) {
            var bid = bids[i];
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
    };

    Product.prototype.addBidToTop = function (person, date, bid) {
        if (this.bids[0].bid >= newBid) {//newBids must be greater than existing bids
            return;
        }
        this.bids.unshift({
            person: person,
            bid: bid,
            date: date
        });
    };

    Product.prototype.placeBid = function () {
        if (!this.isAuction)return;
        var newBid = this.ui.newBid;
        if (this.bids[0].bid >= newBid) {//newBids must be greater than existing bids
            return;
        }
    };

    Product.prototype.loadMoreBids = function () {

    };

    Product.prototype.purchase = function (newBid) {
        if (this.isAuction)return;
    };

    //-----------------------------------------------

    kexProducts.getProducts(null, function (status) {
        if (status.success) {
            products.length = 0;
            var data = status.data;
            var dataLen = data.length;
            for (var i = 0; i < dataLen; i++) {
                var product = new Product(data[i]);
                products.push(product);
            }
        }
    });

});