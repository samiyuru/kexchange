/**
 * Created by samiyuru on 4/2/14.
 */


module.exports.test = function (app, models, ctrls) {

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }

//    ctrls.profileCtrl.createProfile({
//        nickname: 'Samiyuru',
//        name: 'Samiyuru Senarathne',
//        lastwealth: 0,
//        wealth: 0,
//        propic: '/propics/propic01.png'
//    }, 'pass1', function (status) {
//        console.log(status);
//    });
//
//    ctrls.profileCtrl.createProfile({
//        nickname: 'Hasith',
//        name: 'Hasith Yaggahawita',
//        lastwealth: 0,
//        wealth: 0,
//        propic: '/propics/propic02.png'
//    }, 'pass2', function (status) {
//        console.log(status);
//    });

}

describe("server side tests", function() {

    beforeEach(function() {

    });

    it("should be true 1", function() {
        expect(true).toBe(false);
    });

    it("should be true 2", function() {
        expect(true).toBe(true);
    });

});
