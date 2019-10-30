var addCircleDAO = function(database, title, content, social, member, CircleModel, callback) {

    var circle = new CircleModel({
        "title": title,
        "content": content,
        "social": social,
        "member": member,
    });

    circle.save(function(err){
        if(err) {
            console.log(err);
                return null;
            }
            console.log('circle 추가');
        callback(null, circle);
    });  
  
  
};
exports.addCircleDAO = addCircleDAO;