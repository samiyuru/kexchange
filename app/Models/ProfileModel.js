/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId;

    var profileSchema = new mongoose.Schema({
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
            type: Number,
            required: true
        },
        propic: {
            type: String,
            required: true
        },
        purchases: [
            {
                date: {
                    type: Date,
                    required: true
                },
                product: {
                    type: ObjectId,
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

    profileSchema.statics.createProfile = function (profile, cb) {
        this.create(profile, cb);
    };

    profileSchema.statics.getProfile = function (id, cb) {
        this.findById(id, {}, function (err, doc) {

        });
    };

    profileSchema.statics.getProfiles = function (skip, limit, cb) {
        /*
         * {  skip:0, limit:0 }
         * */
        if (limit == null) {
            this.find({})
                .select('nickname name propic wealth')
                .sort('-wealth')
                .exec(cb);
        } else {
            this.find({})
                .select('nickname name propic wealth')
                .sort('-wealth')
                .skip(skip)
                .limit(limit)
                .exec(cb);
        }
    };

    return mongoose.model('profile', profileSchema);

};

