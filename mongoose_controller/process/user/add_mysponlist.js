var DAO = require("../../../mongoose_DAO/user/addMysponlist");
var add_mysponlist = function(req, res, database, UserModel){
    console.log('/process/add_mysponlist 호출');

    var paramId = req.body.id || req.query.id;
    var paramInstitution = req.body.institution || req.query.institution;
    var donation = Number.parseInt(req.body.donation || req.query.donation);
    var date = new Date();

    //데이터베이스 객체가 초기화된 경우, adduser 함수 호출하여 사용자 추가
    if(database) {
        DAO.addMySponlistDAO(database, paramId, paramInstitution, donation, date, UserModel, function(err, result) {
            if(err) {throw err;}
            
            console.log(result);
            // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
            if(result) {
                console.dir(result);             
                res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>후원 성공</h1>');
                res.end();
            } else { //결과 객체가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>후원 실패</h1>');
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

exports.add_mysponlist = add_mysponlist;
