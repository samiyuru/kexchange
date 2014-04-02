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

exports.getProfile = function (id , cb) {

};

exports.getProfiles = function (opt, cb) {
    /*
    * {  skip:0,  limit:0 }
    * */
    if(opt == null){

    }else{

    }
 };





var Product = mongoose.model('product', {
    title:String,
    detail:String,
    type:Number,
    qty:Number,
    isAuction:Boolean,
    minBid:Number,
    price:Number,
    expire:Date,
    imgs:[String]
});