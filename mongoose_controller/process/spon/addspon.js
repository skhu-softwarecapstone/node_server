var DAO = require("../../../mongoose_DAO/spon/addSpon");
var addspon = function(req, res, database, SponModel, IdModel){

    var paramTitle = req.body.title || req.query.title;
    var paramContent = req.body.content || req.query.content;
    var paramInstitution = req.body.institution || req.quey.institution;

    //데이터베이스 객체가 초기화된 경우, adduser 함수 호출하여 사용자 추가
    if(database) {
        DAO.addSponDAO(database,paramTitle, paramContent, paramInstitution,IdModel, SponModel, function(err, result) {
            if(err) {throw err;}
            //console.log(result);
            // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
            if(result) {
                //console.log(result);             
                res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>후원 목록 추가 성공</h1>');
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
}

exports.addspon = addspon;