var addUserDAO = function(database, id, password, role, name, age, school, introduce, UserModel, callback) {
    console.log('addUser 호출됨: ' + id + ', ' + password + ', ' +role + ', ' + age + ', ' + school + ', ' + introduce);

    // UserModel의 인스턴스 생성
    var user = new UserModel(
        {"id":id, 
        "password":password, 
        "role":role,
        "userinfo":{
            "name":name,
            "age":age,
            "school":school,
            "introduce":introduce
        },
        "my_sponlist":[

        ]
    });

    // save로 저장
    user.save(function(err){
        if(err) {
            return;
        }

        console.log('사용자 데이터 추가');
        callback(null, user);
    });
};

exports.addUserDAO = addUserDAO;