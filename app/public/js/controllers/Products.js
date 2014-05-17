/**
 * Created by samiyuru on 4/17/14.
 */

kEX.controller("mybidsctrl", function ($scope, $filter, kexProducts, kexPofiles) {
    var _curProfID = null;
    var products = [];
    var BiddedProductDeco = kexProducts.BiddedProductDeco;
    var AuctionProduct = kexProducts.AuctionProduct;

    var iProductHandler = {
        purchase: null,
        initBid: null,
        placeBid: handlePlaceBid
    };

    kexProducts.getBidedProducts(kexPofiles.getLoggedProf()._id, function (status) {
        if (status.success) {
            products.length = 0;
            var data = status.data;
            var dataLen = data.length;
            for (var i = 0; i < dataLen; i++) {
                var product = new AuctionProduct(data[i]);
                product = BiddedProductDeco(product);
                product.delegate = iProductHandler;
                product.imgs = [
                    "9dd9a249-6451-4db4-a268-f1b0ab5b8b22.jpg",
                    "7a0e69cd-6da1-4078-9314-db785169e819.jpg",
                    "b0be5e7e-c43c-4f6f-a673-8dbd3346ae80.jpg"
                ];
                products.push(product);
            }
        }
    });

    function handlePlaceBid(product) {
        var newBid = product.newBid;
        var now = new Date();
        if (product.bids.length > 0 && product.bids[0].bid >= newBid) return;//newBids must be greater than existing bids

        kexProducts.placeBid(product.id, newBid, function (status) {
            if (status.success) {
                product.addBidToTop(kexPofiles.getLoggedProf(), now, newBid);
                product.bidRank = 1;//most recent bid is mine so rank = 1
                product.newBid = "";//clear bid field if success
            }
        });
    }

    $scope.products = products;
});

kEX.controller("prdctsCtrlr", function ($scope, kexProducts, kexPofiles) {
    var products = [];
    var Product = kexProducts.Product;

    var iProductHandler = {
        purchase: handlePurchase,
        initBid: handleInitBid,
        placeBid: null
    };

    kexProducts.getProducts(null, function (status) {
        if (status.success) {
            products.length = 0;
            var data = status.data;
            var dataLen = data.length;
            for (var i = 0; i < dataLen; i++) {
                var product = kexProducts.Factory.getProductForData(data[i]);
                product.delegate = iProductHandler;
                products.push(product);
            }
        }
    });

    function handleInitBid(product) {
        var newBid = product.newBid;
        var now = new Date();
        if (product.bids.length > 0 && product.bids[0].bid >= newBid) return;//newBids must be greater than existing bids

        kexProducts.placeBid(product.id, newBid, function (status) {
            if (status.success) {
                product.addBidToTop(kexPofiles.getLoggedProf(), now, newBid);
                product.bidRank = 1;//most recent bid is mine so rank = 1
                product.newBid = "";//clear bid field if success
            }
        });
    }

    function handlePurchase(product) {
        kexProducts.purchase(product.id, function (status) {
            if (status.success) {

            }
        });
    }

    $scope.products = products;
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

    $scope.ui = ui;
    $scope.newPrdct = newPrdct;
    $scope.submitProduct = submitProduct;
});