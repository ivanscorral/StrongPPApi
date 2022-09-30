var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
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
users.authorize_user("admin", "1234", function(result){
    users.authorize_token(result);
    en.getLastEntrenamiento(1, function(entrenamientos){
        series.getSeries(entrenamientos.id, function(results){
            console.log('Adding repe to entrenamiento.id: ' + entrenamientos.id + ', series id: ' + results[0].id)
            repes.insertRepeticion(results[0].id, 10, 10);
        })
    });         
});
var ex = new Exercises();
ex.getExercises(function(result){
    console.log(result);
});

 

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
