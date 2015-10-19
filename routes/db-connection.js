var express = require('express');
var app = express();
var mongoose = require('mongoose');

var Detailer = express.Router();

// Connect Database
var db = mongoose.connect('mongodb://localhost:27017/db_test', function(err) {
  if (err) throw err;
  console.log('Ok');
});

// Create New Collection
var Schema = mongoose.Schema

var Detailer = new Schema({
  username: String,
  first_name : String,
  city: String,
  rating: Number,
  img: String,
  basic_wash : Number,
  super_wash : Number,
  deluxe_wash : Number
});

module.exports = mongoose.model('Detailer', Detailer);

