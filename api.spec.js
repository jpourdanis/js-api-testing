var chai = require("chai");
var request = require("supertest");

var expect = chai.expect;

describe("API tests from url", function () {
  it("should return 200", function (done) {
    request("https://jsonplaceholder.typicode.com")
      .get("/todos/1")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it("should return the title", function (done) {
    request("https://jsonplaceholder.typicode.com")
      .get("/todos/1")
      .end(function (err, res) {
        expect(res.body.title).to.be.equal("delectus aut autem");
        done();
      });
  });

  it("should post and return the object", function (done) {
    request("https://jsonplaceholder.typicode.com")
      .post("/posts")
      .send({
        title: "foo",
        body: "bar",
        userId: 1,
      })
      .end(function (err, res) {
        expect(res.body.userId).to.be.equal(1);
        expect(res.body.body).to.be.equal("bar");
        expect(res.body.title).to.be.equal("foo");
        expect(res.body.id).to.be.equal(101);
        expect(res.statusCode).to.be.equal(201);
        done();
      });
  });

  it("should get and post in 1 test", function (done) {
    request("https://jsonplaceholder.typicode.com")
      .get("/todos/1")
      .expect(200, function (err, resp) {
        if (err) return done(err);
        let UserId = resp.body.userId;
        request("https://jsonplaceholder.typicode.com")
          .post("/posts")
          .send({
            title: "foo",
            body: "bar",
            userId: UserId,
          })
          .end(function (err, res) {
            expect(res.body.userId).to.be.equal(1);
            expect(res.body.body).to.be.equal("bar");
            expect(res.body.title).to.be.equal("foo");
            expect(res.body.id).to.be.equal(101);
            expect(res.statusCode).to.be.equal(201);
            done();
          });
      });
  });
});
