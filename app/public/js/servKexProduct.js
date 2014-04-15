/**
 * Created by samiyuru on 4/15/14.
 */
kEX.service("kexProducts", function ($http, kexPofiles) {

    this.createProduct = function (isAuction, type, name, detail, qty, price, expire, imgs, cb) {
        var formData = new FormData();
        formData.append("type", type);
        formData.append("name", name);
        formData.append("detail", detail);
        formData.append("qty", qty);
        formData.append("price", price);
        formData.append("expire", expire);
        var imgLen = imgs.length;
        for (var i = 0; i < imgLen; i++) {
            formData.append("img_" + i, imgs[i]);
        }
        $http({
            method: "POST",
            params: {
                auth: kexPofiles.getAuthToken(),
                isauction: (isAuction) ? 1 : 0
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

});