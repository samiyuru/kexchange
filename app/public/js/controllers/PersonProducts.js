/**
 * Created by samiyuru on 4/23/14.
 */

kEX.controller("instrProducts", function ($scope, kexProducts, kexPofiles, kexEvent) {

    var ui = {
        isLoggedProfile: false
    };
    var BiddedProductDeco = kexProducts.BiddedProductDeco;
    var instoreProducts = [];

    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        var profID = profile._id;
        if (profID == kexPofiles.getLoggedProf()._id) {//if profile is logged in profile
            ui.isLoggedProfile = true;//show 'Need money' button, pay back
        } else {
            ui.isLoggedProfile = false;//hide 'Need money' button, pay back
        }
        kexProducts.getInstoreProductsOf(profID, function (status) {
            if (status.success) {
                var data = status.data;
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var product = kexProducts.Factory.getProductForData(data[i]);
                    if (product.isAuction && product.bids.length > 0) {
                        product = BiddedProductDeco(product);
                    }
                    instoreProducts.push(product);
                }
            }
        });
    });

    $scope.instoreProducts = instoreProducts;
    $scope.ui = ui;
});

kEX.controller("soldProducts", function ($scope, kexProducts, kexPofiles, kexEvent) {

    var ui = {
        isLoggedProfile: false
    };
    var soldProducts = [];

    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        var profID = profile._id;
        if (profID == kexPofiles.getLoggedProf()._id) {//if profile is logged in profile
            ui.isLoggedProfile = true;//show 'Need money' button, pay back
        } else {
            ui.isLoggedProfile = false;//hide 'Need money' button, pay back
        }
        kexProducts.getSoldProductsOf(profID, function (status) {
            if (status.success) {
                var data = status.data;
                var dataLen = data.length;
                for (var i = 0; i < dataLen; i++) {
                    var product = kexProducts.Factory.getProductForData(data[i]);
                    soldProducts.push(product);
                }
            }
        });
    });

    $scope.soldProducts = soldProducts;
    $scope.ui = ui;
});

kEX.controller("purchProducts", function ($scope, kexProducts, kexPofiles, kexEvent) {

    var ui = {
        isLoggedProfile: false
    };
    var purchProducts = [];


    kexPofiles.getCurrentProfile(function currentProfile(profile) {
        var profID = profile._id;
        if (profID == kexPofiles.getLoggedProf()._id) {//if profile is logged in profile
            ui.isLoggedProfile = true;//show 'Need money' button, pay back
        } else {
            ui.isLoggedProfile = false;//hide 'Need money' button, pay back
        }
        kexProducts.getPurchasedProductsOf(profID, function (status) {
            if (status.success) {
                var data = status.data;
                var dataLen = data.length;
                for (var i = 0; i < dataLen; i++) {
                    var product = kexProducts.Factory.getProductForData(data[i]);
                    purchProducts.push(product);
                }
            }
        });
    });

    $scope.purchProducts = purchProducts;
    $scope.ui = ui;
});