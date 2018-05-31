let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let env = require('dotenv').load();
let passport = require('passport');
let session = require('express-session');



//required for passport



let app = express();


// For Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// For Passport
app.use(session({secret:'ilovenodejs', resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

//START Controller

//END Controller

//Models
let models = require('./app/models')

//Routes
let authRoute = require('./app/routes/auth')(app,passport)


require('./app/config/passport.js')(passport, models.user)

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
