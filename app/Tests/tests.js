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

    //============================routetests============================
    //=========http://0.0.0.0:3000/test/132422343?name=samiyuru=========
    app.get('/test/:id', function (req, res) {
        //request.body.fieldName //process forms
        app.set('id', req.params.id);
        res.json({
            intId: parseInt(req.params.id),
            intStr: req.params.id,
            queryName: req.query.name
        });
    });

}
