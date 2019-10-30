var selectNotiDAO = function(database, NoticeModel, index,  callback) {

    var page = index*10;

    NoticeModel.find(
        {},
        {id:1, title:1, content:1, date:1,_id:0},
        function(err, results){

            if(err) {
            return err
        }
        var notices = {
            "notices": null
        };
        notices.notices = results;
        console.log(notices);
        if(results.length >0) {
            console.log('일치하는 인덱스 찾음');
            callback(null, notices);
        } else {
            console.log('일치하는 인덱스를 찾지 못함');
            callback(null, null);
        }
    }).sort({"id":-1}).skip(page).limit(10);
};     

exports.selectNotiDAO = selectNotiDAO;