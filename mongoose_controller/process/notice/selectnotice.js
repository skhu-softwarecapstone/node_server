var DAO = require("../../../mongoose_DAO/notice/selectNoti");
var selectnotice = function (req, res, database, NoticeModel) {
    
    var paramIndex = req.body.index || req.query.index;
    if (database) {
        DAO.selectNotiDAO(database, NoticeModel, Number.parseInt(paramIndex), function (err, docs) {
            if (err) { throw err; }

            if (docs) {
                res.json(docs);
                res.end();
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
                res.write('<h1>로그인실패</h1>');
                res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오</p></div>');
                res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다</p></div>');
        res.end();
    }
}

exports.selectnotice = selectnotice;