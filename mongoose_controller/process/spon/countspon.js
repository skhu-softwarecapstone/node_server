var DAO = require("../../../mongoose_DAO/spon/countSpon");
var countspon = function (req, res, database, SponModel) {
    
    if (database) {
        DAO.countSponDAO(database, SponModel, function (err, docs) {
            if (err) { throw err; }

            if (docs) {
                console.dir(docs);
                res.json(docs);
                res.end();
            } else {
                console.log("count spon 실패");
            }
        });
    } else {
        console.log("데이터베이스 연결 실패");
    }
}

exports.countspon = countspon;