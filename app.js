var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var jsonParser = bodyParser.json();

// Connect Database
var db = mongoose.connect('mongodb://localhost:27017/db_test', function(err) {
  if (err) throw err;
  console.log('Ok');
});

var Schema = mongoose.Schema

var Detailer = new Schema({
  first_name : String,
  basic_wash : Number,
  super_wash : Number,
  deluxe_wash : Number
  });

var Detailer = mongoose.model('Detailer', Detailer);

app.post('/add-detailers' ,jsonParser , function(req, res){
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  var detailer_data = {
    first_name: req.body.firstname,
    basic_wash: req.body.basicwash,
    super_wash: req.body.superwash,
    deluxe_wash: req.body.deluxewash
  };
  //console.log(detailer_data);

  var detailer = new Detailer(detailer_data);

  detailer.save( function(error, data){
    if(error){
      res.json(error);
    }
    else{
      res.json(data);

    }
  });
});

app.get('/show-detailers', function(req, res){
  Detailer.find({}, function(error, data){
    res.json(data);
  });
});

//Basic Routes

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/add-detailers', function(req, res){
  res.sendFile(path.join(__dirname + '/add-detailers.html'))
});

app.use('/images', express.static(__dirname + '/images'));
app.use('/js' , express.static(__dirname + '/js'));
app.use('/', express.static(__dirname + '/'));


app.listen(1339);
console.log('1339 is the magic port');