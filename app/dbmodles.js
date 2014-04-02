/**
 * Created by samiyuru on 3/31/14.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kexchange');

var Profile = mongoose.model('profile', {
    nickname: String,
    name: String,
    wealth: Number,
    propic: String
});


exports.createProfile = function (profile, cb) {
    Profile.create(profile, cb);
};