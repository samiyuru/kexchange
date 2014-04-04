
module.exports.route = function(app){

    console.log("routing...");

    app.get('/profiles', function(req, res){

    });
    app.get('/profile', function(req, res){

    });
    app.get('/profile/new', function(req, res){

    });
    app.get('/profile/:id', function(req, res){

    });
    app.get('/profile/:id/bids', function(req, res){

    });
    app.get('/profile/:id/purchases', function(req, res){

    });
    app.get('/profile/:id/investments', function(req, res){

    });
    app.get('/profile/:id/accounts', function(req, res){

    });
    app.get('/profile/:id/loans', function(req, res){

    });
    app.get('/profile/:id/loans/pay', function(req, res){

    });
    app.get('/profile/:id/products', function(req, res){

    });
    app.get('/profile/:id/notifications', function(req, res){

    });


    app.get('/products', function(req, res){

    });
    app.get('/products/:id/purchase', function(req, res){

    });
    app.get('/products/:id/bids', function(req, res){

    });
    app.get('/products/:id/newbid', function(req, res){

    });
    app.get('/products/new', function(req, res){

    });
    app.get('/products/:id/remove', function(req, res){

    });


    app.get('/investments', function(req, res){

    });
    app.get('/investments/new', function(req, res){

    });
    app.get('/investments/:id/remove', function(req, res){

    });
    app.get('/investments/:id/take', function(req, res){

    });


    app.get('/plugins/reload', function(req, res){

    });

    //================tests=================
    //  http://0.0.0.0:3000/test/132422343?name=samiyuru
    app.get('/test/:id', function(req, res){
        app.set('id', req.params.id);
        res.json({
            intId:parseInt(req.params.id),
            intStr:req.params.id,
            queryName:req.query.name
        });
    });

};
