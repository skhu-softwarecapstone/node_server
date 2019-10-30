var addNotiDAO = function(database, title, content, IdModel, NoticeModel, callback) {

    IdModel.find({id:"_notice_id"}, function(err, results){
        if(err){
            return err
        } 
        var object = results[0].sequence;
        //console.log(object["sequence"]);
        var notice = new NoticeModel({
            "id": object,
            "date": new Date().toDateString(),
            "title": title,
            "content": content,
            "role": "admin"
        });
        IdModel.update({id:"_notice_id"}, {$inc:{sequence:1}}, function(err, results){
            if(err) {
                return null
            }
            console.log(results);
        });
    
        notice.save(function(err){
            if(err) {
                callback(err, null);
            }
            callback(null, notice);
        })
    });
};     

exports.addNotiDAO = addNotiDAO;