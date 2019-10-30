var authUserDAO = function(database, id, password, UserModel, callback) {

    // 아이디와 비밀번호를 사용해 검색
    var object = {
        "role": null,
    };
    
    UserModel.find({"id":id, "password":password },{id:1, password:1, role:1, _id:0}, function(err, results){
        if(err) {
            callback(err, null);
            return;
        }

        // console.log('아이디 [%s], 비밀번호 [%s]로 사용자 검색 결과', id, password);
        object["role"] = results[0].role;
        console.log(object);

        if(results.length >0) {
            console.log('일치하는 사용자 찾음');
            callback(null, results);
        } else {
            console.log('일치하는 사용자를 찾지 못함');
            callback(null, null);
        }
    });
};
exports.authUserDAO = authUserDAO;