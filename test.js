var request = require('supertest')('http://localhost:1339');

describe('GET /show-detailers', function() {

  it('test 200', function(done){
    request
        .get('/show-detailers')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
        if (err) return done(err);
        done();
        });

  });

  //it('respond with json', function(done){
  //  var firstname = {first_name: 'Nick'};
  //  request
  //      .post('/add-detailers')
  //      .send(firstname)
  //      .expect({first_name: 'Sam'}, done);
  //});



});