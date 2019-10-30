var selectDailylogDAO = function(database, userid, date, DailylogModel, callback) {

    var currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    console.log(currentDate);
    DailylogModel.find(
        {"writer_id":userid, "date":currentDate}, {_id:0}, 
        function(err, results){
            if(err) {
                console.log(err);
                callback(err, null);
            }

            var dailylog = {
                dailylog: null
            }
            dailylog.dailylog = results;
            console.log('해당 dailylog 검색');
            callback(null, dailylog);
        });
};

exports.selectDailylogDAO = selectDailylogDAO;