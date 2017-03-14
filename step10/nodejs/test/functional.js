const request = require('supertest'),
      app     = require('../app');
      winston = require('winston'),
      util    = require('util'),
      port    = 3000,
      baseURL = util.format('http://localhost:%s', port);

before(function(){
    app.listen(port, function(){
        winston.info(util.format("server listening on port %s", port));
    });
});

describe('Creation', function(){
  it('should create dummy data', function(done){
    request(baseURL)
      .post('/data')
      .set('Content-Type', 'application/json')
      .send({"ts":"2017-03-11T15:00:53Z", "type": "temp", "value": 34, "sensor_id": 123 })
      .expect(201)
      .end(function(err, res){
        if (err) throw err;
        done();
      })
  });
});
