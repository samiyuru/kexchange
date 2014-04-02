/**
 * Created by samiyuru on 3/31/14.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kexchange');

var Profile = mongoose.model('profile', {
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    wealth: {
        type: String
    },
    propic: {
        type: String,
        required: true
    }
});


exports.createProfile = function (profile, cb) {
    Profile.create(profile, cb);
};

exports.getProfile = function (id, cb) {

};

exports.getProfiles = function (opt, cb) {
    /*
     * {  skip:0,  limit:0 }
     * */
    if (opt == null) {

    } else {

    }
};


/*
* if auction qty, minbid and exp are mandatory
* */
var Product = mongoose.model('product', {
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    qty: Number,
    remQty: Number,
    isAuction: {
        type: Boolean,
        required: true
    },
    minBid: Number,
    price: Number,
    expire: Date,
    imgs: [String],
    bids: [
        {
            person: {
                type: mongoose.Schema.ObjectId,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            bid: {
                type: Number,
                required: true
            }
        }
    ]
});

exports.createProduct = function (owner, product, cb) {
    Profile.create(profile, cb);
};

exports.placeBid = function(productID, person, bid, cb){

};

exports.purchase = function(productID, person, cb){

};

exports.getProducts = function(opt, cb){
/*
* {
*   skip:0,
*   limit:0,
*   isAuction:false
* }
* */
};