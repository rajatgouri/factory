const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const routeController = require('./routes/router');
const database = require('./util/database');
const config = require('./config');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  ttl: 8.64e+7,
  name: 'session',
  secret: config.sessionKey,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      maxAge: 8.64e+7,
      expires: 8.64e+7
  }
}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, 'public')));

//routes

app.use('/', routeController.init());
app.use(cors({
  origin: '*',
  credentials: true
}));


// app.use((req, res, next) => {
//   if(req.cookies) {
//     console.log('has cookies');
//     next();
//   } else {
//     console.log('cookies not exist redirect to login page');
//     next('login')
//   }
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if(req.url === '/') {
    next();
  } else {
    next(createError(404));
  }
});

app.use((req,res,next) => {
  if(req.cookies.session) {
    console.log('session exists');
    res.redirect('dashboard');
  } else{ 
    console.log('session not exists');
    res.redirect('/login');
  }
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
