/**
 * Created by samiyuru on 4/4/14.
 */

module.exports = function (mongoose) {
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
                    type: mongoose.Schema.ObjectId,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    }, 'profiles');


    this.createProfile = function (profile, cb) {
        Profile.create(profile, cb);
    };

    this.getProfile = function (id, cb) {

    };

    this.getProfiles = function (opt, cb) {
        /*
         * {  skip:0, limit:0, sortBy:'' }
         * */
        if (opt == null) {

        } else {

        }
    };
};

