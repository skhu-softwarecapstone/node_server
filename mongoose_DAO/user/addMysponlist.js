var addMySponlistDAO = function(database, id, institution, donation, date, UserModel, callback) {
    console.log('addSponlistDAO 호출됨')

    UserModel.update(
        {id: id},
        {'$push': {'my_sponlist':{
            'institution':institution,
            'donation':donation,
            'date':date
        }}},
        function(err, results) {

        if(err) {
            console.error(err);
            callback(err, null);
        }

        console.log('mysponlist 데이터 추가');
        callback(null, results);
    })
};

exports.addMySponlistDAO = addMySponlistDAO;