/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initModel = function (mongoose) {

    var ObjectId = mongoose.Schema.ObjectId;

    var pluginSchema = new mongoose.Schema({

    }, {
        collection: 'plugins'
    });

    return mongoose.model('plugin', pluginSchema);
};

