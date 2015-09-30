var express = require('express');
var should = require('should');
var request = require('supertest');
//var Detailer = require('./routes/db-connection.js');
//var dataStore = require('./routes/db.js');

describe('GET /add-detailers', function() {

  var app = express();

  app.get('/', function(req, res){
      res.send('Alive');
  });

  var agent = request.agent(app);

  it('respond with json', function(done){
    agent
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
        if (err) return done(err);
        //console.log(body);
        done();
        });
        //.end(done)
  });



});