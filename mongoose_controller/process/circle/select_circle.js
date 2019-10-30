var DAO = require("../../../mongoose_DAO/circle/selectCircle");
var select_circle = function (req, res, database, CircleModel) {
    
    var paramSocial = req.body.social || req.query.social;

    if (database) {
        DAO.selectCircleDAO(database, paramSocial, CircleModel, function (err, docs) {
            if (err) { throw err; }

            if (docs) {
                res.json(docs);
                res.end();
            } else {
                console.log('cirlce 조회 실패');
            }
        });
    } else {
        console.log('데이터베이스 연결 실패')
    }
}

exports.select_circle = select_circle;