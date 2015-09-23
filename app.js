var express = require('express');
var app = express();
var path = require('path');

var imagesave = require('./js/imagesave.js');
var dataStore = require('./js/db.js');

app.use('/upload' , imagesave);
app.use('/', dataStore);
app.use(express.static('./'));

app.post('/wash', function(req, res){
  res.send('Check');
});

app.listen(1339);
console.log('1339 is the magic port');