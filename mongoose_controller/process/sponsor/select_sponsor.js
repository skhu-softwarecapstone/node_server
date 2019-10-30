var DAO = require("../../../mongoose_DAO/sponsor/selectSponsor");
var select_sponsor = function (req, res, database, SponsorModel) {
    
    if (database) {
        DAO.selectSponsorDAO(database, SponsorModel, function (err, docs) {
            if (err) { throw err; }

            if (docs) {
                res.json(docs);
                res.end();
            } else {
                console.log('sponsor 조회 실패');
            }
        });
    } else {
        console.log('데이터베이스 연결 실패')
    }
}

exports.select_sponsor = select_sponsor;