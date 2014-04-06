/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId;

    /*
     * if auction: qty, minbid and exp are mandatory
     * */
    var productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        },
        owner: {
            type: ObjectId,
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
                    type: ObjectId,
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

    productSchema.statics.createProduct = function (owner, product, cb) {
        Profile.create(profile, cb);
    };

    productSchema.statics.placeBid = function (productID, person, bid, cb) {

    };

    productSchema.statics.purchase = function (productID, person, cb) {

    };

    productSchema.statics.getProducts = function (opt, cb) {
        //always order by date
        /*
         * {
         *   skip:num,
         *   limit:num,
         *   owner:id,
         *   isAuction:bool
         * }
         * */
    };

    return mongoose.model('product', productSchema);
};

