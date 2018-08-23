let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let env = require('dotenv').load();
let passport = require('passport');
let session = require('express-session');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let ejs = require('ejs');

let app = express();

// For Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

//For Connect Flash
app.use(flash());
//For Express Validator
app.use(expressValidator());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine','ejs');


app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// For Passport
app.use(session({
    secret:'ilovenodejs',
    resave: true,
    saveUninitialized:true,
    cookie: { maxAge : 3600000 }
}));
app.use(passport.initialize());
app.use(passport.session());

//START Controller
// app.get('/', function(req, res) {
//     var drinks = [
//         { name: 'Bloody Mary', drunkness: 3 },
//         { name: 'Martini', drunkness: 5 },
//         { name: 'Scotch', drunkness: 10 }
//     ];
//     var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
//
//     res.render('index', {
//         drinks: drinks,
//         tagline: tagline,
//         title: 'Index Page'
//     });
// });
//END Controller

//Models
let models = require('./app/models')
app.get('/admin',(req,res)=>{
  res.render('index_admin')
})

//Routes
let authRoute = require('./app/routes/auth')(app,passport);
let karyawanRoute = require('./app/routes/karyawan')(app);
// let memberRoute = require('./app/routes/master_member')(app);
// let detailProfileRoute = require('./app/routes/detailprofile')(app);
// let productRoute = require('./app/routes/product')(app);

require('./app/config/passport.js')(passport, models.tbl_karyawan);
console.log(models.tbl_karyawan)
//Sync Database
models.sequelize.sync().then(function(){
   console.log('Berhasil Database di Sync Sequelize!')
 }).catch((err)=>{
   console.log(err,'Ada Yang Error!')
 })




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
