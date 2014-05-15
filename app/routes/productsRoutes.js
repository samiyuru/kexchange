/**
 * Created by samiyuru on 4/16/14.
 */

module.exports.route = function (app, ctrls) {

    app.get('/api/products', ctrls.productCtrl.getProductsFor);

    app.post('/api/products/:prdId/purchase', ctrls.productCtrl.purchase);

    app.post('/api/products/:prdId/bid', ctrls.productCtrl.placeBid);

    app.post('/api/products/', ctrls.productCtrl.createProduct);

    app.get('/api/products/:prdId/remove', function(){});

}