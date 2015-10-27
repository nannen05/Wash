var express = require('express');
var app = express();
var path = require('path');

var imagesave = require('./routes/imagesave.js');
var dataStore = require('./routes/db.js');

//static routes to
app.use('/' , imagesave);
app.use('/', dataStore);
app.use(express.static('./uploads'));
app.use(express.static('./public'));
app.use(express.static('./public/views'));


app.get('/user', function(req, res){
  res.send('hello world');
});


app.listen(process.env.port || 3000);
