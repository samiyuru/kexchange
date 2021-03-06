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
            ref: 'profile',
            index: true
        },
        type: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        remQty: {
            type: Number,
            required: true
        },
        soldQty: {
            type: Number,
            required: true
        },
        isAuction: {
            type: Boolean,
            required: true
        },
        price: Number, /*if auction this is minbid or later the max bid after bidding*/
        expire: {
            type: Date,
            required: true
        },
        bidCount: {
            type: Number,
            required: true
        },
        imgs: [String],
        bids: [
            {
                person: {
                    type: ObjectId,
                    ref: 'profile',
                    index: true
                },
                date: {
                    type: Date
                },
                bid: {
                    type: Number
                }
            }
        ],
        purchases: [
            {
                date: {
                    type: Date
                },
                buyer: {
                    type: ObjectId,
                    ref: 'profile',
                    index: true
                },
                price: {//added here for efficiency in finding price of an auctioned product
                    type: Number
                }
            }
        ]
    }, {
        collection: 'products'
    });

    var model = mongoose.model('product', productSchema);

    function createProduct(profID, product, fileNames, cb) {
        var prdctMdl = {
            date: new Date(),
            title: product.name,
            detail: product.detail,
            owner: TypObjectID(profID),
            type: product.type,
            qty: product.qty,
            remQty: product.qty,
            soldQty: 0,
            isAuction: (product.isauction == 1),
            price: product.price || 0,
            expire: product.expire,
            imgs: fileNames,
            bidCount: 0,
            bids: []
        };
        model.create(prdctMdl, cb);
    };

    function placeBid(profID, productID, bid, cb) {
        var now = new Date();
        var profObjID = TypObjectID(profID);
        model.update({
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
            expire: {
                $gte: now
            }
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
                    ],
                    $sort: {//sort without slice needs mongodb 2.6
                        date: -1//sort descending by date
                    }
                }
            }
        }, cb);
    };

    function purchase(profID, productID, price, cb) {
        var now = new Date();
        var profObjID = TypObjectID(profID);
        model.update({
            isAuction: false,
            _id: TypObjectID(productID),
            owner: {
                $ne: profObjID
            },
            remQty: {
                $gte: 1
            },
            expire: {
                $gte: now
            }
        }, {
            $inc: {
                remQty: -1,
                soldQty: 1
            },
            $push: {
                purchases: {
                    date: now,
                    buyer: profObjID,
                    price: price
                }
            }
        }, cb);
    };

    function makeQuery(srch, isAuction, chunk) {
        if (isAuction) {
            srch.isAuction = (isAuction === 1) || (isAuction === true);
        }
        var query = model.find(srch);
        if (chunk) {
            query = query.skip(chunk.skip);
            query = query.limit(chunk.limit);
        }
        query = query.populate('owner', Utils.getProfileFieldsPub());
        return query;
    };

    function execQuery(query, cb) {
        query.sort('-date')
            .exec(cb);
    };

    function getProductById(productID, cb) {
        model.findById(TypObjectID(productID), cb);
    };

    function removeProductById(productID, cb) {
        model.findByIdAndRemove(TypObjectID(productID), cb);
    };

    function getProductsFor(profID, isAuction, chunk, cb) {
        var profObjID = TypObjectID(profID);
        var now = new Date();
        var query = makeQuery({
            owner: {
                $ne: profObjID//not owns
            },
            remQty: {
                $gte: 1//items should remain
            },
            "bids.person": {
                $ne: profObjID//not bidded
            },
            "purchases.buyer": {
                $ne: profObjID//not bought
            },
            expire: {
                $gte: now
            }
        }, isAuction)
            .populate('bids.person', Utils.getProfileFieldsPub());
        execQuery(query, cb)
    };

    function getInstorPrdsOf(profID, isAuction, chunk, cb) {
        var now = new Date();
        var query = makeQuery({
            owner: TypObjectID(profID),
            expire: {
                $gte: now
            }
        }, isAuction)
            .populate('purchases.buyer', Utils.getProfileFieldsPub())
            .populate('bids.person', Utils.getProfileFieldsPub());
        execQuery(query, cb)
    };

    function getPurchasesOf(profID, isAuction, chunk, cb) {
        var profObjID = TypObjectID(profID);
        var query = makeQuery({
            owner: {
                $ne: profObjID//not owns
            },
            "purchases.buyer": profObjID
        }).select('-bids');
        execQuery(query, cb);
    };

    function getSoldPrdsOf(profID, isAuction, chunk, cb) {
        var profObjID = TypObjectID(profID);
        var query = makeQuery({
            owner: profObjID,
            soldQty: {
                $gt: 0
            }
        })
            .populate('bids.person', Utils.getProfileFieldsPub());
        execQuery(query, cb)
    };

    function getBidedProducts(profID, cb) {
        var profObjID = TypObjectID(profID);
        var now = new Date();
        var query = makeQuery({
            isAuction: true,
            owner: {
                $ne: TypObjectID(profID)//not owns
            },
            remQty: {
                $gt: 0//items should remain
            },
            expire: {
                $gt: now
            },
            "bids.person": profObjID
        })
            .populate('bids.person', Utils.getProfileFieldsPub());
        execQuery(query, cb)
    };

    return {
        createProduct: createProduct,
        placeBid: placeBid,
        purchase: purchase,
        getProductById: getProductById,
        removeProductById: removeProductById,
        getProductsFor: getProductsFor,
        getInstorPrdsOf: getInstorPrdsOf,
        getPurchasesOf: getPurchasesOf,
        getSoldPrdsOf: getSoldPrdsOf,
        getBidedProducts: getBidedProducts
    };
};

