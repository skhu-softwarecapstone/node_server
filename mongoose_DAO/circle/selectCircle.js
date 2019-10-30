var selectCircleDAO = function(database, social ,CircleModel, callback) {

        var social = social;
        console.log(social);
    CircleModel.find(
        {"social": social},
        {title:1, content:1, social:1, member:1, _id:0},
        function(err, results){

            if(err) {
            return err
            }
        var circles = {
            "circles": null
        };
        circles.circles = results;
        
        
        if(results.length >0) {
            console.log('일치하는 인덱스 찾음');
            callback(null, circles);
        } else {
            console.log('일치하는 인덱스를 찾지 못함');
            callback(null, null);
        }
    })
};     

exports.selectCircleDAO = selectCircleDAO;