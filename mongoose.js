// Express 모듈 불러오기
var express = require('express'),
    http = require('http'),
    path = require('path');

// Express 미들 웨어 불러오기
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler');

// 오류 핸들러 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

//익스프레스 객체 생성
var app = express();

// 기본 속성 설정

app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cooike-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialzed: true
}));

// 몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이버테이스에 연결
function connectDB() {
    //데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017';

    //데이터베이스 연결
    MongoClient.connect(databaseUrl ,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
        if(err) throw err;

        console.log('데이터베이스에 연결되었습니다: ' + databaseUrl);

        // database 변수에 할당;
        database = client.db('test');
        
    });
}
//라우터 객체 참조

// mongoose 모듈 불러들이기
var mongoose = require('mongoose');

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 모델 객체를 위한 변수 선언
var UserModel;

// 데이터베이스에 연결
function connectDB() {
    // 데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017/test';

    // 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다');
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', function(){
        console.log('데이터베이스에 연결되었습니다.: ' + databaseUrl);
    })

    // 스키마 정의
    var UserSchema = mongoose.Schema({
        id: String,
        password: String,
        role: String,
        userinfo: Object,
        my_sponlist: Array,
    });

    var NoticeSchema = mongoose.Schema({
        id: {type: Number, required:true, unique:true} ,
        date: String,
        title: String,
        content: String,
        writer_id: String,
    });

    var IdSchema = mongoose.Schema({
        id: String,
        sequence: Number
    });

    var SponSchema = mongoose.Schema({
        id: {type: String, require:true, unique:true} ,
        date: String,
        title: String,
        content: String,
        volunteer_institution: String, 
        writer_id: String,
    });
0
    var DailylogSchema = mongoose.Schema({
        title: String,
        content: String,
        date: String,
        writer_id: String
    });

    var CircleShema = mongoose.Schema({
        title: String,
        content: String,
        social: String,
        member: Array,
    });

    var SeniorShema = mongoose.Schema({
        seNo: Number,
        name: String,
        age: Number,
        gender: Boolean,
        point: String,
        phone: String,
        disabllity: String,
        address: Object,
        uniqueness: String
    });

    var SponsorShema = mongoose.Schema({
        userId: String,
        password: String,
        userType: String,
        spNo: String,
        name: String,
        age: Number,
        gender: Boolean,
        point: Number,
        phone: String,
        visits: Number,
        report: Object
    });

    console.log('UserSchem 정의함');

    // UserModel 정의
    UserModel = mongoose.model("users", UserSchema);
    NoticeModel = mongoose.model("notices", NoticeSchema);
    SponModel =  mongoose.model("spons", SponSchema);
    IdModel = mongoose.model("idschemas", IdSchema);
    DailylogModel = mongoose.model("dailylogs", DailylogSchema);
    CircleModel = mongoose.model("circles", CircleShema);
    SeniorModel = mongoose.model("seniors", SeniorShema);
    SponsorModel = mongoose.model("sponsors", SponsorShema);

    console.log('Model 정의함');
    
    // 연결 끊어졌을 때 5초 후 재연결
    database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    })
}

var router = express.Router();




/*---------------------------------------------------------------------- controller start ------------------------------------------------------------------------*/

/* --------------------------------------------사용자계정 controller --------------------------------------------------------------------------*/
// 사용자 계정 추가
var controller_user_add = require('./mongoose_controller/process/user/adduser');
router.route('/process/adduser').all(function(req, res) {
    console.log('adduser');
    controller_user_add.adduser(req, res, database, UserModel);
});


// 사용자 계정 인증
var controller_user_auth = require('./mongoose_controller/process/user/authuser');
router.route('/process/login').all(function(req, res) {
    console.log('authuser');
    controller_user_auth.authuser(req, res, database, UserModel);
});

// 사용자 my_sponlist 검색
var controller_user_select_sponlist = require('./mongoose_controller/process/user/select_mysponlist');
router.route('/process/select_mysponlist').all(function(req,res) {
    console.log('select_mysponlist');
    controller_user_select_sponlist.select_mysponlist(req, res, database, UserModel);
});

// 사용자 my_sponlist 추가
var controller_user_add_sponlist = require('./mongoose_controller/process/user/add_mysponlist');
router.route('/process/add_mysponlist').all(function(req,res){
    console.log('add_mysponlist');
    controller_user_add_sponlist.add_mysponlist(req, res, database, UserModel);
});

/* -------------------------------------------- 일지 controller --------------------------------------------------------------------------*/

//일지 추가
var controller_dailylog_add = require('./mongoose_controller/process/dailylog/add_dailylog');
router.route('/process/add_dailylog').all(function(req, res) {
    console.log('add_dailylog');
    controller_dailylog_add.add_dailylog(req, res, database, DailylogModel);
});

//일지 id로 dailylogs date 배열 가져오기
var controller_dailylog_select_dates = require('./mongoose_controller/process/dailylog/select_dailylog_dates');
router.route('/process/select_dailylog_dates').all(function(req, res) {
    console.log('select_dailylog_dates');
    controller_dailylog_select_dates.select_dailylog_dates(req, res, database, DailylogModel);
})

//일지 id, date로 검색
var controller_dailylog_select = require('./mongoose_controller/process/dailylog/select_dailylog');
router.route('/process/select_dailylog').all(function(req,res) {
    console.log('select_dailylg');
    controller_dailylog_select.select_dailylog(req, res, database, DailylogModel);
});

/* ----------------------------------------------공지사항 controller -----------------------------------------------------------------------------*/

//공지사항 count 개수
var controller_noti_count = require('./mongoose_controller/process/notice/countnotice');
router.route('/process/countnotice').all(function(req,res) {
    console.log('countnotice');
    controller_noti_count.countnotice(req, res, database, NoticeModel);
});

//공지사항 추가
var controller_noti_add = require('./mongoose_controller/process/notice/addnotice');
router.route('/process/addnotice').post(function(req,res) {
    controller_noti_add.addnotice(req, res, database, NoticeModel, IdModel);
});

//공지사항 검색(page 인덱스 따라서)
var controller_noti_select = require('./mongoose_controller/process/notice/selectnotice');
router.route('/process/selectnotice').all(function(req,res) {
    controller_noti_select.selectnotice(req, res, database, NoticeModel);
});

/* --------------------------------------------후원 기업 controller -------------------------------------------------------------------------*/

//후원 count 개수
var controller_spon_count = require('./mongoose_controller/process/spon/countspon');
router.route('/process/countspon').all(function(req, res) {
    controller_spon_count.countspon(req, res, database, SponModel);
});

//후원 기업 추가
var controller_spon_add = require('./mongoose_controller/process/spon/addspon');
router.route('/process/addspon').all(function(req, res) {
    controller_spon_add.addspon(req,res, database, SponModel, IdModel);
});

//후원 기업 검색(page 인덱스 따라서)
var controller_spon_select = require('./mongoose_controller/process/spon/selectspon');
router.route('/process/selectspon').all(function(req, res){
    controller_spon_select.selectspon(req,res,database, SponModel);
});

/* --------------------------------------------Circle controller -------------------------------------------------------------------------*/
//Circle 추가
var controller_circle_add = require('./mongoose_controller/process/circle/add_circle');
router.route('/process/addcircle').all(function(req, res){
    controller_circle_add.add_circle(req,res, database, CircleModel);
});

//Circle 조회
var controller_circle_select = require('./mongoose_controller/process/circle/select_circle');
router.route('/process/selectcircle').all(function(req, res){
    controller_circle_select.select_circle(req,res, database, CircleModel);
});

/* --------------------------------------------Senior controller -------------------------------------------------------------------------*/
//노인 조회
var controller_seniors_select = require('./mongoose_controller/process/seniors/select_senior');
router.route('/process/selectsenior').all(function(req, res){
    controller_seniors_select.select_senior(req, res, database, SeniorModel);
});

/* --------------------------------------------Sponsor controller -------------------------------------------------------------------------*/
var controller_sponsor_select = require('./mongoose_controller/process/sponsor/select_sponsor');
router.route('/process/selectsponsor').all(function(req,res){
    controller_sponsor_select.select_sponsor(req,res,database, SponsorModel);
})

/*---------------------------------------------------------------------- controller end ------------------------------------------------------------------------*/

// 라우터 객체 등록
app.use('/', router);

// ==== 404 오류 페이지 처리 ==== //
var errorHandler = expressErrorHandler({
    // static: {
    //     '404': './public/404.html'
    // }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


// ==== 서버 시작 ==== //
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트: ' + app.get('port'));

    // 데이터베이스 연결
    connectDB();
})