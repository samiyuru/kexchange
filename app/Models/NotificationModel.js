/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId;

    var notificationSchema = new mongoose.Schema({

    }, {
        collection: 'notifications'
    });

    var model = mongoose.model('notification', notificationSchema);

    return {};
};
