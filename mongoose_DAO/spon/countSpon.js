var countSponDAO = function(database, SponModel, callback) {
    SponModel.count(
        function(err, results){
            if(err) {
            return err
        }

        var count = {
            "count":null
        };
        if(results!==undefined||results!==null) {
            count.count = results;
            console.log('일치하는 인덱스 찾음');
            callback(null, count);
        } else {
            console.log('일치하는 인덱스를 찾지 못함');
            callback(null, null);
        }
    });
};     

exports.countSponDAO = countSponDAO;