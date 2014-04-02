/**
 * Created by samiyuru on 4/2/14.
 */

var dbmodles = require('../dbmodles');

exports.test = function () {

    dbmodles.createProfile({
        nickname: 'Samiyuru',
        name: 'Samiyuru Senarathne',
        wealth: '0',
        propic: 'images/propics/propic01.png'
    }, function cb(err, profile) {
        if (err)throw err;
        console.log(profile);
    });

}
