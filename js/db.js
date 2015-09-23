var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dataStore = express.Router();

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
  city: String,
  rating: Number,
  img: String,
  basic_wash : Number,
  super_wash : Number,
  deluxe_wash : Number
});

var Detailer = mongoose.model('Detailer', Detailer);

dataStore.post('/add-detailers' ,jsonParser , function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var imagepath = req.body.image;

  var detailer_data = {
    first_name: req.body.firstname,
    city: req.body.city,
    rating: req.body.rating,
    basic_wash: req.body.basicwash,
    super_wash: req.body.superwash,
    deluxe_wash: req.body.deluxewash,
    img: imagepath.replace("C:\\fakepath\\", "")

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

dataStore.get('/show-detailers', function(req, res){
  Detailer.find({}, function(error, data){
    res.json(data);
  });
});

module.exports = dataStore;