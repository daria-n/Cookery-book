/**
 * Created by Daria on 07.10.2017.
 */
var express = require('express');
var path = require('path');
var open = require('open');

var app = express();

var PORT = 3000;

app.set('port', process.env.PORT || PORT);

app.set('views', path.resolve(__dirname, '..', 'static', 'views'));
app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname, '..', 'static')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/recipes', function (req, res) {
    res.json(require('../recipes_data.json'));
});

app.listen(app.get('port'), function () {
    console.log('App started on port ' + app.get('port') + '.');
    open('http://127.0.0.1:' + app.get('port'));
});
