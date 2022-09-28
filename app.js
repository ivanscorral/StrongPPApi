var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Users = require('./src/db/users/users');
const Exercises = require('./src/db/data/exercises');
const Entrenamientos = require('./src/db/data/entrenamientos');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var en = new Entrenamientos();

var users = new Users();
users.authorize_user("admin", "1234", function(result){
    users.authorize_token(result);
    en.newEntrenamiento(result);
});
var ex = new Exercises();
ex.getExercises(function(result){
    console.log(result);
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
