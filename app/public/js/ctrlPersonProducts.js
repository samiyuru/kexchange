/**
 * Created by samiyuru on 4/23/14.
 */

kEX.controller("prsnProducts", function ($scope, kexProducts, kexPofiles, kexEvent) {

    var ui = {
        isLoggedProfile: false
    };

    var purchProducts = [];
    var instoreProducts = [];
    var soldProducts = [];
    var Product = kexProducts.Product;

    $scope.purchProducts = purchProducts;
    $scope.instoreProducts = instoreProducts;
    $scope.soldProducts = soldProducts;

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
                    var product = new Product(data[i]);
                    purchProducts.push(product);
                }
            }
        });
        kexProducts.getInstoreProductsOf(profID, function (status) {
            if (status.success) {
                var data = status.data;
                var dataLen = data.length;
                for (var i = 0; i < dataLen; i++) {
                    var product = new Product(data[i]);
                    instoreProducts.push(product);
                }
            }
        });
        kexProducts.getSoldProductsOf(profID, function (status) {
            if (status.success) {
                var data = status.data;
                var dataLen = data.length;
                for (var i = 0; i < dataLen; i++) {
                    var product = new Product(data[i]);
                    soldProducts.push(product);
                }
            }
        });
    });

})
;