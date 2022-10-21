var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var util = require('util')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');

const Users = require('./src/db/users/users');
const Exercises = require('./src/db/data/exercises');
const Entrenamientos = require('./src/db/data/entrenamientos');
const Series = require('./src/db/data/series');
const Repeticiones = require('./src/db/data/repes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var en = new Entrenamientos();
var series = new Series();
var repes = new Repeticiones();
var users = new Users();
users.authorize_user("admin", "1234", async function(result){
    users.authorize_token(result);
    var lastEntrena  = await en.getLastEntrenamiento(1);
    var seriesFull = await en.getFullEntrenamiento(4);
var exe = await series.getExerciseName(3)
    console.log(JSON.stringify(seriesFull))
    console.log(exe)
});
var ex = new Exercises();
ex.getExercises(function(result){
    console.log(result);
});

 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data/', dataRouter);


module.exports = app;
