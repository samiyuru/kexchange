/**
 * Created by samiyuru on 4/15/14.
 */
kEX.service("kexProducts", function ($http, kexPofiles, kexEvent, kexProductTypes) {

    var AuctionProduct = kexProductTypes.AuctionProduct;
    var FixedProduct = kexProductTypes.FixedProduct;

    this.Factory = {
        getProductForData: function (data) {
            if (data.isAuction == true) return new AuctionProduct(data);
            else if (data.isAuction == false) return new FixedProduct(data);
        }
    };

    this.BiddedProductDeco = kexProductTypes.BiddedProductDeco;
    this.AuctionProduct = AuctionProduct;
    this.FixedProduct = FixedProduct;

    //-----------------------------------------------

    this.createProduct = function (isAuction, type, name, detail, qty, price, expire, imgs, cb) {
        var formData = new FormData();
        formData.append("type", type);
        formData.append("name", name);
        formData.append("detail", detail);
        formData.append("qty", qty);
        formData.append("price", price);
        if (expire)
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
            url: "/api/profile/" + profID + "/products/bids"
        }).success(function (data) {
                cb(data);
            });
    };


    this.getSoldProductsOf = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + profID + "/products/sold"
        }).success(function (data) {
                cb(data);
            });
    };

    this.getInstoreProductsOf = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + profID + "/products/instore"
        }).success(function (data) {
                cb(data);
            });
    };

    this.getPurchasedProductsOf = function (profID, cb) {
        $http({
            method: "GET",
            params: {
                auth: kexPofiles.getAuthToken()
            },
            url: "/api/profile/" + profID + "/products/purchased"
        }).success(function (data) {
                cb(data);
            });
    };

});




















