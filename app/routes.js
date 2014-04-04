var fs = require('fs');

module.exports.route = function(app, mongoose){

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


    app.get('/propics/:file', function(req, res){
        var path = './images/propics/' + req.params.file;
        fs.exists(path, function(exists) {
            if (exists) {
                res.sendfile(path);
            }else{
                res.end('404 content not found');
            }
        });
    });

};
