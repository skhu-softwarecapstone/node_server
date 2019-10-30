var selectDailylogDatesDAO = function(database, userid, DailylogModel, callback) {

    DailylogModel.find(
        {"writer_id":userid}, {date:1, _id:0}, 
        function(err, results){
            if(err) {
                console.log(err);
                callback(err, null);
            }
            var dates = {
                dates: null
            }
            dates.dates = results;
            console.log('해당 id의 dailylog Dates 검색');
            callback(null, dates);
        });
};

exports.selectDailylogDatesDAO = selectDailylogDatesDAO;