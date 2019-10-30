var DAO = require("../../../mongoose_DAO/user/addUser");
var adduser = function(req, res, database, UserModel){
    console.log('/process/adduser 호출');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramRole = req.body.role || req.query.role;
    var paramName = req.body.name || req.query.nmae;
    var paramAge = req.body.age || req.query.age;
    var paramSchool = req.body.school || req.query.school;
    var paramIntrouce = req.body.introduce || req.query.introduce;

    console.log('요청 파라미터: ' + paramId +', ' + paramPassword +', ' + paramRole +' '+ paramName +', ' + paramAge +', ' + paramSchool + ', '+paramIntrouce);

    //데이터베이스 객체가 초기화된 경우, adduser 함수 호출하여 사용자 추가
    if(database) {
        DAO.addUserDAO(database, paramId, paramPassword, paramRole,paramName, paramAge, paramSchool, paramIntrouce, UserModel, function(err, result) {
            if(err) {throw err;}
            
            console.log(result);
            // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
            if(result) {
                console.dir(result);             
                res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>사용자 추가 성공</h1>');
                res.end();
            } else { //결과 객체가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>사용자 추가 실패</h1>');
                res.end();
            }
        });
    }else { // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다</p></div>');
        res.end();
    }
};

exports.adduser = adduser;