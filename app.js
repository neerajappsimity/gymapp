var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
var bodyParser = require('body-parser')

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}))
app.use(bodyParser.json({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**** Routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/**** Mongoose DB conntect */
const mongoose = require('mongoose');
const database = require('./config/database');
mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose.connect(database.database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"




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
