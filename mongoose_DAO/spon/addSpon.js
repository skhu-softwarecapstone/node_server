var addSponDAO = function(database, title, content, volunteer_institution,IdModel, SponModel, callback) {

    IdModel.find({id:"_spon_id"}, function(err, results){
        if(err){
            return err
        } 
        var object = results[0].sequence;
        //console.log(object["sequence"]);

        var spon = new SponModel({
            id: object,
            date: new Date().toDateString(),
            title: title,
            content: content,
            volunteer_institution: volunteer_institution, 
            writer_id: "spon",
        });

        IdModel.update({id:"_spon_id"}, {$inc:{sequence:1}}, function(err, results){
            if(err) {
                return null
            }
            console.log(results);
        });
    
       spon.save(function(err){
            if(err) {
                callback(err, null);
            }
            callback(null, spon);
        })
    });
};     

exports.addSponDAO = addSponDAO;