/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId,
        TypObjectID = mongoose.Types.ObjectId;

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
        status: {
            type: String,
            required: true
        },
        loan: {
            type: Number,
            required: true
        },
        lastwealth: {
            type: Number,
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
        profile.wealth = 0;
        profile.lastwealth = 0;
        profile.loan = 0;
        profile.status = 'Beginner';
        this.create(profile, cb);
    };

    profileSchema.statics.getProfile = function (profID, cb) {
        this.findOne({
            _id: TypObjectID(profID)
        })
            .select('_id nickname name propic wealth lastwealth')
            .exec(cb);
    };

    profileSchema.statics.getProfiles = function (chunk, cb) {
        var findObj = {};
        var query = this.find({})
            .select('_id nickname name propic wealth lastwealth')
            .sort('-wealth');
        if (chunk) {
            query = query.skip(chunk.skip)
                .limit(chunk.limit);
        }
        query.exec(cb);
    };

    profileSchema.statics.putMoney = function (profID, amount, cb) {
        cb(true);
    };

    profileSchema.statics.getMoney = function (profID, amount, cb) {
        cb(amount);
    };

    return mongoose.model('profile', profileSchema);

};

