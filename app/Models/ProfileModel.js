/**
 * Created by samiyuru on 4/4/14.
 */
var Utils = require(__base + "/utils");

module.exports.initModel = function (mongoose, accEvent) {

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
                price: {//added here for efficiency in finding price of an auctioned product
                    type: Number,
                    required: true
                }
            }
        ]
    }, {
        collection: 'profiles'
    });

    var model = mongoose.model('profile', profileSchema);

    function createProfile(profile, cb) {
        profile.wealth = 0;
        profile.lastwealth = 0;
        profile.loan = 0;
        profile.status = 'Beginner';
        model.create(profile, cb);
    };

    function getProfile(profID, cb) {
        model.findOne({
            _id: TypObjectID(profID)
        })
            .select(Utils.getProfileFieldsPub())
            .exec(cb);
    };

    function getProfiles(chunk, cb) {
        var findObj = {};
        var query = model.find({})
            .select(Utils.getProfileFieldsPub())
            .sort('-wealth');
        if (chunk) {
            query = query.skip(chunk.skip)
                .limit(chunk.limit);
        }
        query.exec(cb);
    };

    function putMoney(profID, amount, cb) {
        cb(true);
    };

    function getMoney(profID, amount, cb) {
        cb(amount);
    };

    function transferMoney(formProfID, toProfID, amount, cb) {// cb(err, isSuccess)
        getMoney(formProfID, amount, function moneyGetCB(_amount) {
            if (amount != _amount) {
                cb("money retrieval error", false);
                return;
            }
            putMoney(toProfID, amount, function moneyGiveCB(success) {
                if (!success) {
                    cb("money transfer error", false);
                    return;
                }
                cb(null, true);
            });
        });
    }

    return {
        createProfile: createProfile,
        getProfile: getProfile,
        getProfiles: getProfiles,
        putMoney: putMoney,
        getMoney: getMoney,
        transferMoney: transferMoney
    };

};

