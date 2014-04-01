/**
 * Created by samiyuru on 3/31/14.
 */

exports.dbmodles = new function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

    var Profile = mongoose.model('profile', {
        nickname: String,
        name: String,
        wealth: Number,
        propic: String
    });


    this.createProfile = function (profile, cb) {
        Profile.create(profile, cb);
    };

}