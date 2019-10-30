var DAO = require('../../../mongoose_DAO/dailylog/addDailylog');
var add_dailylog = function(req, res, database, UserModel){
    console.log('/process/dailylog 호출');
    var paramId = req.body.id || req.query.id;
    var paramTitle = req.body.title || req.query.title;
    var paramContent = req.body.content || req.query.content;
    var paramDate = req.body.date || req.query.date;

    if(database) {
        DAO.addDailylogDAO(database, paramId, paramTitle, paramContent, paramDate,DailylogModel,function(err, results){
            if(err) {throw err;}

            if(results) {
                res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>dailylog추가 성공</h1>');
                // res.write('<div><p>사용자 아이디: ' + paramId + '</p></div>');
                // res.write('<div><p>사용자 이름: ' + username + '</p></div>');
                // res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
                res.write('<h1>로그인실패</h1>');
                res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오</p></div>');
                res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
                res.end();
            }
        });
    }else {
        res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다</p></div>');
        res.end();
                
    }
}
exports.add_dailylog = add_dailylog;