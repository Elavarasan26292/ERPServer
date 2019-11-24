const createError = require('http-errors');
const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const routenoAuth = require('./routenoauth');
const route = require('./route');

const app = express();
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ERP/', routenoAuth);
app.use('/AERP/', route);

// Commented below code snippet to test CORS related issue in SIT-- Kaleem (20/05/2019)
// catch 404 and forward to error handler 
// app.use(function (req, res, next) { 
//   next(createError(404));
// });


// ....Middleware..............
app.use(function(req, res, next) { 
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");  
  res.setHeader(
    "Access-Control-Allow-Headers",
    "lang_id,ee_id,clientsid,X-Requested-With,x-access-token,Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Expose-Headers", "token");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next(createError(404));
});
// .......................


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log("Api started at port 8012")
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.response = require('./response');
module.exports = app;
