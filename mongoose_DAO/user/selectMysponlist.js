var selectMySponlistDAO = function(database, id, UserModel, callback) {

    UserModel.find(
        {id: id},
        {my_sponlist:1, _id:0},
        function(err, results){

            if(err) {
            return err
        }
        
        if(results.length >0) {
            console.log('일치하는 인덱스 찾음');
            callback(null, results[0]);
        } else {
            console.log('일치하는 인덱스를 찾지 못함');
            callback(null, null);
        }
    });
};     

exports.selectMySponlistDAO = selectMySponlistDAO;