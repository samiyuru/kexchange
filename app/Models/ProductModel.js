/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

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
            required: true,
            ref: 'profile'
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
            isAuction: (product.isauction == 1),
            price: product.price,
            expire: product.expire,
            imgs: fileNames,
            bids: []
        }, cb);
    };

    productSchema.statics.placeBid = function (profID, productID, bid, cb) {
        
    };

    productSchema.statics.purchase = function (productID, profID, cb) {

    };

    productSchema.statics._getProducts = function (srch, isRem, isAuction, chunk, populate, cb) {//isAuction 1 or 0
        //always order by date
        if (isAuction) {
            srch.isAuction = (isAuction === 1);
        }
        if (isRem === true) {//available
            srch.remQty = {
                $gte: 1
            };
        } else if (isRem === false) {//out of stock
            srch.remQty = 0;
        }
        var query = this.find(srch);
        if (populate) {
            query = query.populate('owner', Utils.getProfileFieldsPub());
        }
        query = query.populate('bids.person', Utils.getProfileFieldsPub());
        if (chunk) {
            query = query.skip(chunk.skip);
            query = query.limit(chunk.limit);
        }
        query.sort('-date')
            .exec(cb);
    };

    /*
     * isAuction accepts true, false, 1, 0
     * */
    productSchema.statics.getProductsFor = function (profID, isAuction, chunk, cb) {
        //profID, profIDOwns, isRem, isAuction, chunk, populate, cb
        this._getProducts({
            owner: {
                $ne: TypObjectID(profID)//not owns
            }
        }, true, isAuction, null, true, cb);
    };

    productSchema.statics.getProductsOf = function (profID, isAuction, chunk, cb) {
        //profID, profIDOwns, isRem, isAuction, chunk, populate, cb
        this._getProducts({
            owner: TypObjectID(profID)
        }, null, isAuction, null, true, cb);
    };

    return mongoose.model('product', productSchema);
};

