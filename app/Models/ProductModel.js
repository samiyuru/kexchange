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
        price: Number, /*if auction this is minbid or later the max bid after bidding*/
        expire: Date,
        bidCount: {
            type: Number,
            required: true
        },
        imgs: [String],
        bids: [
            {
                person: {
                    type: ObjectId,
                    ref: 'profile'
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
            price: product.price || 0,
            expire: product.expire,
            imgs: fileNames,
            bidCount: 0,
            bids: []
        }, cb);
    };

    productSchema.statics.getBidedProducts = function (profID, cb) {
        var profObjID = TypObjectID(profID);
        var now = new Date();
        this._getProducts({
            isAuction: true,
            owner: {
                $ne: TypObjectID(profID)//not owns
            },
            remQty: {
                $gte: 1//items should remain
            },
            $or: [
                {
                    expire: null
                },
                {
                    expire: {
                        $gte: now
                    }
                }
            ],
            "bids.person": profObjID
        }, null, null, null, true, cb);
    };

    productSchema.statics.placeBid = function (profID, productID, bid, cb) {
        var now = new Date();
        var profObjID = TypObjectID(profID);
        this.update({
            isAuction: true,
            _id: TypObjectID(productID),
            owner: {
                $ne: profObjID //owner cannot bid
            },
            remQty: {
                $gte: 1//items should remain
            },
            price: {
                $lt: bid //new bid must be bigger than the latest bid or minbid
            },
            $or: [
                {
                    expire: null
                },
                {
                    expire: {
                        $gte: now
                    }
                }
            ]
        }, {
            $set: {
                price: bid //now minbid is the latest bid
            },
            $inc: {
                bidCount: 1
            },
            $push: {
                bids: {
                    $each: [//each is needed for sort
                        {
                            person: profObjID,
                            date: now,
                            bid: bid
                        }
                    ]//,
//                    $sort: {//sort without slice needs mongodb 2.6
//                        date: -1//sort descending by date
//                    }
                }
            }
        }, cb);
    };

    productSchema.statics.purchase = function (productID, profID, cb) {
        var now = new Date();
        var profObjID = TypObjectID(profID);
        this.update({
            isAuction: false,
            _id: TypObjectID(productID),
            owner: {
                $ne: profObjID
            },
            remQty: {
                $gte: 1
            },
            $or: [
                {
                    expire: null
                },
                {
                    expire: {
                        $gte: now
                    }
                }
            ]
        }, {
            $inc: {
                remQty: -1
            }
        }, cb);
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
            .exec(function (err, docs) {
                if (!err) {
                    for (var i in docs) {
                        var doc = docs[i];
                        doc.bids.sort(function compare(a, b) {
                            if (a.date < b.date)
                                return 1;
                            if (a.date > b.date)
                                return -1;
                            return 0;
                        });
                    }
                }
                cb(err, docs);
            });
    };

    /*
     * isAuction accepts true, false, 1, 0
     * */
    productSchema.statics.getProductsFor = function (profID, isAuction, chunk, cb) {
        var profObjID = TypObjectID(profID);
        //profID, profIDOwns, isRem, isAuction, chunk, populate, cb
        this._getProducts({
            owner: {
                $ne: profObjID//not owns
            },
            "bids.person": {
                $ne: profObjID//not bidded
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

