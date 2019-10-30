var addDailylogDAO = function(database, userid, title, content, date, DailylogModel, callback) {

    var input_date = new Date(date);
    var currentDate = `${input_date.getFullYear()}-${input_date.getMonth()+1}-${input_date.getDate()}`;
    
    var dailylog = new DailylogModel({
        "title": title,
        "content": content,
        "date": currentDate,
        "writer_id": userid,
    });

    DailylogModel.find(
    {'writer_id':userid, 'date': currentDate},
    function(err, results) {
        if(err) {
            callback(err, null);
        }


        if(results.length>0) { //중복하는것이 있을 경우
            console.log(results);
            DailylogModel.update({'writer_id':userid, 'date': currentDate},
            {"title": title,
            "content": content,
            "date": currentDate,
            "writer_id": userid}
            , function(err, results){
                if(err) {
                    callback(err, null);
                }

                if(results) {
                    callback(null, results);
                }
            })
        } else { //중복하는것이 없을 경우   
            dailylog.save(function(err){
                if(err) {
                    console.log(err);
                    return null;
                }
                console.log('dailylog 추가');
                callback(null, dailylog);
            });  
        } 
    });
    
};

exports.addDailylogDAO = addDailylogDAO;