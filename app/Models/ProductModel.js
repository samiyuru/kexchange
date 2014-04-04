/**
 * Created by samiyuru on 4/4/14.
 */

module.exports = function (mongoose) {
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
    }, 'products');

    this.createProduct = function (owner, product, cb) {
        Profile.create(profile, cb);
    };

    this.placeBid = function (productID, person, bid, cb) {

    };

    this.purchase = function (productID, person, cb) {

    };

    this.getProducts = function (opt, cb) {
        //always order by date
        /*
         * {
         *   skip:0,
         *   limit:0,
         *   isAuction:false
         * }
         * */
    };
};

