var express = require('express');
var app = express();
var path = require('path');

var imagesave = require('./routes/imagesave.js');
var dataStore = require('./routes/db.js');

app.use('/' , imagesave);
app.use('/', dataStore);
app.use(express.static('./uploads'));
app.use(express.static('./public'));
app.use(express.static('./public/images'));
app.use(express.static('./public/uploads'));

//app.post('/wash', function(req, res){
//  res.send('Check');
//});

app.listen(1339);
console.log('1339 is the magic port');