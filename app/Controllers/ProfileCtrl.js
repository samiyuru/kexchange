/**
 * Created by samiyuru on 4/4/14.
 */

module.exports.initCtrl = function(models){

    var profileModel = models.profileModel;

    return new (function(models){

        this.peopleByWealth = function(skip, limit, cb){
            profileModel.getProfiles(skip, limit, cb);
        };

    })();

};