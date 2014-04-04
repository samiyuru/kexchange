var fs = require('fs');

module.exports.route = function(app, mongoose){

    console.log("routing...");

    app.get('api/profiles', function(req, res){

    });
    app.get('api/profile', function(req, res){

    });
    app.get('api/profile/new', function(req, res){

    });
    app.get('api/profile/:id', function(req, res){

    });
    app.get('api/profile/:id/bids', function(req, res){

    });
    app.get('api/profile/:id/purchases', function(req, res){

    });
    app.get('api/profile/:id/investments', function(req, res){

    });
    app.get('api/profile/:id/accounts', function(req, res){

    });
    app.get('api/profile/:id/loans', function(req, res){

    });
    app.get('api/profile/:id/loans/pay', function(req, res){

    });
    app.get('api/profile/:id/products', function(req, res){

    });
    app.get('api/profile/:id/notifications', function(req, res){

    });


    app.get('api/products', function(req, res){

    });
    app.get('api/products/:id/purchase', function(req, res){

    });
    app.get('api/products/:id/bids', function(req, res){

    });
    app.get('api/products/:id/newbid', function(req, res){

    });
    app.get('api/products/new', function(req, res){

    });
    app.get('api/products/:id/remove', function(req, res){

    });


    app.get('api/investments', function(req, res){

    });
    app.get('api/investments/new', function(req, res){

    });
    app.get('api/investments/:id/remove', function(req, res){

    });
    app.get('api/investments/:id/take', function(req, res){

    });


    app.get('api/plugins/reload', function(req, res){

    });

};
