const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // Test GET request
  test("Convert a valid input such as 10L: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10km")
      .end(function (err, res) {
        assert.strictEqual(res.status, 200); // Check status code
        assert.isObject(res.body); // Response should be an object
        assert.strictEqual(res.body.initNum, 10); // Check initial number
        assert.strictEqual(res.body.initUnit, "km"); // Check initial unit
        assert.strictEqual(res.body.returnUnit, "mi"); // Check converted unit
        done();
      });
  });
  test("Convert an invalid input such as 32g: GET request to /api/convert",function(done){
    chai
    .request(server)
    .get("/api/convert?input=32g")
    .end(function(err, res) {
      assert.isObject(res.body); // Response should be an object
      assert.strictEqual(res.body.error, "invalid unit"); // Error message check
      done();
    });

  });
  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.",function(done){
    chai
    .request(server)
    .get("/api/convert?input=3/7.2/4kg")
    .end(function(err, res) {
      assert.isObject(res.body); // Response should be an object
      assert.strictEqual(res.body.error, "invalid number"); // Error message check
      done();
    });

  });
  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert",function(done){
    chai
    .request(server)
    .get("/api/convert?input=3/7.2/4kilogagram")
    .end(function(err, res) {
      assert.isObject(res.body); // Response should be an object
      assert.strictEqual(res.body.error, "invalid number and unit"); // Error message check
      done();
    });

  });
  test("Convert with no number such as kg: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.strictEqual(res.status, 200); // Check status code
        assert.isObject(res.body); // Response should be an object
        assert.strictEqual(res.body.initNum, 1); // Check initial number
        assert.strictEqual(res.body.initUnit, "kg"); // Check initial unit
        assert.strictEqual(res.body.returnUnit, "lbs"); // Check converted unit
        done();
      });
  });

});
