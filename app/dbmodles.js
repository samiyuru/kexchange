/**
 * Created by samiyuru on 3/31/14.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kexchange');

var Profile = mongoose.model('profile', {
    nickname: {
        type: String,
        required: true,
        unique: true,
        dropDubs: true
    },
    name: {
        type: String,
        required: true
    },
    wealth: {
        type: String,
        required: true
    },
    propic: {
        type: String,
        required: true
    },
    purchases: [
        {
            date: {type: Date,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    collection: 'profiles'
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
}, {
    collection: 'products'
});

exports.createProduct = function (owner, product, cb) {
    Profile.create(profile, cb);
};

exports.placeBid = function (productID, person, bid, cb) {

};

exports.purchase = function (productID, person, cb) {

};

exports.getProducts = function (opt, cb) {
    //always order by date
    /*
     * {
     *   skip:0,
     *   limit:0,
     *   isAuction:false
     * }
     * */
};


var Investment = mongoose.model('investment', {
    amount: {
        type: Number,
        required: true
    },
    profitRate: {
        type: Number,//percent
        required: true
    },
    investor: {
        date: {
            type: Date,
            required: true
        },
        id: {
            type: mongoose.Schema.ObjectId,
            required: true
        }
    },
    debitor: {
        date: {
            type: Date
        },
        id: {
            type: mongoose.Schema.ObjectId
        }
    }
}, {
    collection: 'investments'
});

exports.getInvestors = function (opt) {
    //always order by date
    /*
     * {
     *   skip:0,
     *   limit:0
     * }
     * */
};

exports.getLoansOf = function(personID){

};

exports.getInvestmentsOf = function(personID){

};

exports.changeProfit = function(investmentID){

};

exports.removeInvestment = function(investmentID){

};