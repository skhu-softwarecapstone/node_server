var DAO = require("../../../mongoose_DAO/user/selectMysponlist");
var select_mysponlist = function (req, res, database, UserModel) {
    
    var paramId = req.body.id || req.query.id;
    if (database) {
        DAO.selectMySponlistDAO(database, paramId, UserModel, function (err, docs) {
            if (err) { throw err; }

            if (docs) {
                res.json(docs);
                res.end();
            } else {
                res.json({'fail':'select_mysponlist failed'});
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

exports.select_mysponlist = select_mysponlist;