var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');

var image = express.Router();

image.post('/upload', function (req, res) {

  var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
    res.end('success');
    //console.log(files);
  });
  form.on('end', function(fields, files) {
    var temp_path = this.openedFiles[0].path;
    //console.log(temp_path);
    var file_name = this.openedFiles[0].name;
    var new_location = path.dirname(require.main.filename) + "/uploads/";
    //console.log(new_location);
    //console.log(temp_path);
    fs.rename(temp_path, new_location + file_name, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});

module.exports = image;