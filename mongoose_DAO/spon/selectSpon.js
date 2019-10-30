var selectSponDAO = function(database, SponModel, index,  callback) {

    var page = index*10;

    SponModel.find(
        {},
        {_id:0},
        function(err, results){

            if(err) {
            return err
        }
        var spons = {
            "spons": null
        };
        spons.spons = results;
        if(results.length >0) {
            console.log('일치하는 인덱스 찾음');
            callback(null, spons);
        } else {
            console.log('일치하는 인덱스를 찾지 못함');
            callback(null, null);
        }
    }).sort({"id":-1}).skip(page).limit(10);
};     

exports.selectSponDAO = selectSponDAO;