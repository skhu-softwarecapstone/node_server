var DAO = require('../../../mongoose_DAO/circle/addCircle');
var add_circle = function(req, res, database, CircleModel){
    
    var paramTitle = req.body.title || req.query.title;
    var paramContent = req.body.content || req.query.content;
    var paramSocial = req.body.social || req.query.social;
    var paramMember = req.body.member || req.query.member; 

    var member = paramMember.split(',');
    if(database) {
        DAO.addCircleDAO(database, paramTitle, paramContent, paramSocial, member, CircleModel, function(err, results){
            if(err) {throw err;}

            if(results) {
                console.log('circle 추가 성공')
            } else {
                console.log('circle 추가 실패')
            }
        });
    }else {
        console.log('데이터베이스 연결 실패')     
    }
}
exports.add_circle = add_circle;