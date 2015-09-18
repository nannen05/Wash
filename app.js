var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');



app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var jsonParser = bodyParser.json();

//app.get('/detailers', function(req, res) {
//  res.send(JSON.parse(body));
//})

// Connect Database
mongoose.connect('mongodb://localhost:27017/db_test', function(err) {
  if (err) throw err;
  console.log('Ok');
});

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectID;


var Detailer = new Schema({
  first_name      : String,
  basic_wash       : Number,
  super_wash        : Number,
  deluxe_wash         : Number
  });


var Detailer = mongoose.model('Detailer', Detailer);

app.post('/add-detailers' ,jsonParser , function(request, response){
  response.setHeader('Content-Type', 'application/json');
  console.log(request.body);
  var detailer_data = {
    first_name: request.body.firstname
    //basic_wash: request.body.basic,
    //super_wash: request.body.super,
    //deluxe_wash: request.params.deluxe
  };

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

//app.get('/add-detailers/:firstname/:basic/:super/:deluxe', function(req, res){
//  var detailer_data = {
//    first_name: req.params.firstname,
//    basic_wash: req.params.basic,
//    super_wash: req.params.super,
//    deluxe_wash: req.params.deluxe
//  };
//
//  var detailer = new Detailer(detailer_data);
//
//  detailer.save( function(error, data){
//    if(error){
//      res.json(error);
//    }
//    else{
//      res.json(data);
//
//    }
//  });
//});


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


app.listen(1338);
console.log('1338 is the magic port');