var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
let { CreateSuccessResponse, CreateErrorResponse } = require('./utils/responseHandler')
let constants = require("./utils/constants")
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect("mongodb://127.0.0.1/quanlyhoso");
mongoose.connection.on('connected',()=>{
  console.log("connected");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(constants.SECRET_KEY_COOKIE));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', require('./routes/auth'));
app.use('/roles', require('./routes/roles'));
app.use('/department', require('./routes/department'));
app.use('/position', require('./routes/position'));
app.use('/employee', require('./routes/employee'));
app.use('/contract', require('./routes/contract'));
app.use('/education', require('./routes/education'));
app.use('/rp', require('./routes/rewardPunishment'));


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
  CreateErrorResponse(res, err.status||500, err.message)
});


//

module.exports = app;
