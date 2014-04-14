/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {


    var ObjectId = mongoose.Schema.ObjectId,
        TypObjectID = mongoose.Types.ObjectId;

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
        date: {
            type: Date,
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
        qty: {
            type: Number,
            required: true
        },
        remQty: Number,
        isAuction: {
            type: Boolean,
            required: true
        },
        price: Number, /*if auction this is minbid*/
        expire: Date,
        imgs: [String],
        bids: [
            {
                person: {
                    type: ObjectId
                },
                date: {
                    type: Date
                },
                bid: {
                    type: Number
                }
            }
        ]
    }, {
        collection: 'products'
    });

    productSchema.statics.createProduct = function (profID, product, fileNames, cb) {
        this.create({
            date: new Date(),
            title: product.name,
            detail: product.detail,
            owner: TypObjectID(profID),
            type: product.type,
            qty: product.qty,
            remQty: product.qty,
            isAuction: ((product.isauction == 1) ? true : false),
            price: product.price,
            expire: product.expire,
            imgs: fileNames,
            bids: []
        }, cb);
    };

    productSchema.statics.placeBid = function (productID, profID, bid, cb) {

    };

    productSchema.statics.purchase = function (productID, profID, cb) {

    };

    productSchema.statics.getProducts = function (profID, profIDOwns, isRem, isAuction, chunk, cb) {
        //always order by date
        var srch = {};
        if (profIDOwns) {
            srch.owner = TypObjectID(profID);//owns
        } else {
            srch.owner = {
                $ne: TypObjectID(profID)//not owns
            };
        }
        if (isAuction != null) {
            srch.isAuction = isAuction;
        }
        if (isRem === true) {//available
            srch.remQty = {
                $gte: 1
            };
        } else if (isRem === false) {//out of stock
            srch.remQty = 0;
        }
        var query = this.find(srch);
        if (chunk) {
            query = query.skip(chunk.skip);
            query = query.limit(chunk.limit);
        }
        query.sort('-date')
            .exec(cb);
    };

    productSchema.statics.getProductsOf = function (ownerID, isAuction, chunk, cb) {
        this.getProducts(ownerID, true, true, null, null, cb);
    };

    productSchema.statics.getProductsFor = function (profID, isAuction, chunk, cb) {

    };

    return mongoose.model('product', productSchema);
};

