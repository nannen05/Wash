var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Detailer = require('./db-connection.js');

var dataStore = express.Router();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var jsonParser = bodyParser.json();

dataStore.post('/add-detailers' ,jsonParser , function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var imagepath = req.body.image;

  var detailer_data = {
    username: req.body.username,
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

dataStore.get('/users/:username', function (req, res) {
  if (req.params.username) {
    Detailer.find({ username: req.params.username }, function (error, data) {
      //res.json(data);
      res.sendFile(path.join(__dirname, '../public/views', 'user.html'));

    });
  }
});



module.exports = dataStore;