var DAO = require("../../../mongoose_DAO/seniors/selectSeniors");
var select_senior = function (req, res, database, SeniorModel) {
    
    if (database) {
        DAO.selectSeniorDAO(database, SeniorModel, function (err, docs) {
            if (err) { throw err; }

            if (docs) {
                res.json(docs);
                res.end();
            } else {
                console.log('senior 조회 실패');
            }
        });
    } else {
        console.log('데이터베이스 연결 실패')
    }
}

exports.select_senior = select_senior;