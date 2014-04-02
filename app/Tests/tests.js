/**
 * Created by samiyuru on 4/2/14.
 */

var dbmodles = require('../dbmodles');

exports.test = function () {
    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    }

    dbmodles.createProfile({
        nickname: 'Samiyuru ' + generateUUID(),
        name: 'Samiyuru Senarathne',
        wealth: '0',
        propic: 'images/propics/propic01.png'
    }, function cb(err, profile) {
        if (err)throw err;
        console.log(profile);
    });

}
