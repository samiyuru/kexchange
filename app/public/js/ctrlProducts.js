/**
 * Created by samiyuru on 4/17/14.
 */

kEX.controller("mybidsctrl", function ($scope, $filter, kexProducts, kexPofiles) {
    var _curProfID = null;
    var products = [];

    //-----------------------------------------------

    $scope.products = products;

    //-----------------------------------------------

    var Product = kexProducts.Product;

    var BiddedProduct = function (prdObj) {
        Product.apply(this, [prdObj]);//parent is inited here. ui prop is inited in parent
        this.ui.showbids = false;
    };

    BiddedProduct.prototype = new Product({});

    //-----------------------------------------------

    kexProducts.getBidedProducts(kexPofiles.getLoggedProf()._id, function (status) {
        if (status.success) {
            products.length = 0;
            var data = status.data;
            var dataLen = data.length;
            for (var i = 0; i < dataLen; i++) {
                var product = new BiddedProduct(data[i]);
                products.push(product);
            }
        }
    });

});

kEX.controller("prdctsCtrlr", function ($scope, $filter, kexProducts, kexPofiles) {

    var _curProfID = null;
    var products = [];

    //-----------------------------------------------

    $scope.products = products;

    //-----------------------------------------------

    var Product = kexProducts.Product;

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

kEX.controller("newPrdCtrl", function ($scope, kexProducts) {
    var ui = {
        form: false,
        prdctTypes: [
            {
                name: "Session Tickets",
                value: 0
            },
            {
                name: "Knowledge Transfer",
                value: 1
            },
            {
                name: "Code Review",
                value: 2
            },
            {
                name: "Code Help",
                value: 3
            }
        ]
    };

    var newPrdct = {
        name: "",
        detail: "",
        type: 0,
        qty: 1,
        isAuction: false,
        minBid: 0,
        price: "",
        images: [],
        expire: null
    };

    var _creationInProg = false;

    $scope.ui = ui;
    $scope.newPrdct = newPrdct;
    $scope.submitProduct = submitProduct;

    function submitProduct() {
        if (_creationInProg)return;
        _creationInProg = true;
        //isAuction, type, name, detail, qty, price, expire, imgs
        kexProducts.createProduct(newPrdct.isAuction
            , newPrdct.type
            , newPrdct.name
            , newPrdct.detail
            , newPrdct.qty
            , (newPrdct.isAuction) ? newPrdct.minBid : newPrdct.price
            , newPrdct.expire
            , newPrdct.images
            , function (status) {
                if (status.success) {
                    ui.form = false;
                    resetFields();
                }
                _creationInProg = false;
            });
    }

    function resetFields() {
        newPrdct.name = "";
        newPrdct.detail = "";
        newPrdct.type = 0;
        newPrdct.qty = 1;
        newPrdct.isAuction = false;
        newPrdct.minBid = 0;
        newPrdct.price = "";
        newPrdct.images = [];
        newPrdct.expire = null;
    }

});