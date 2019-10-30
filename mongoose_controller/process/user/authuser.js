var DAO = require("../../../mongoose_DAO/user/authUser");
var authuser = function(req, res, database, UserModel){

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    console.log("prammID: " + paramId +" paramPassword: " + paramPassword);
    if(database) {
        DAO.authUserDAO(database, paramId, paramPassword, UserModel,function(err, docs){
            if(err) {throw err;}

            if(docs) {
                res.json({"login":{"id":paramId, "success":true, "role":docs[0].role}});
                res.end();
            } else {
                res.json({"login":{"id":paramId, "success":false}});
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
exports.authuser = authuser;
