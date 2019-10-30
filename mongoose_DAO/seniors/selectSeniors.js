var selectSeniorDAO = function(database, SeniorModel, callback) {

    SeniorModel.find(
    {},
    function(err, results){

        if(err) {
        return err
        }
    var seniors = {
        "seniors": null
    };
    seniors.seniors = results;
    
    
    if(results.length >0) {
        console.log('일치하는 인덱스 찾음');
        callback(null, seniors);
    } else {
        console.log('일치하는 인덱스를 찾지 못함');
        callback(null, null);
    }
})
};     

exports.selectSeniorDAO = selectSeniorDAO;