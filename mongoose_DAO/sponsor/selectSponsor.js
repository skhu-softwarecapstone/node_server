var selectSponsorDAO = function(database, SponsorModel, callback) {

    SponsorModel.find(
    {},
    function(err, results){

        if(err) {
        return err
        }
    var sponsors = {
        "sponsors": null
    };
    sponsors.sponsors = results;
    
    
    if(results.length >0) {
        console.log('일치하는 인덱스 찾음');
        callback(null, sponsors);
    } else {
        console.log('일치하는 인덱스를 찾지 못함');
        callback(null, null);
    }
})
};     

exports.selectSponsorDAO = selectSponsorDAO;