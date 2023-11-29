const Shelter = require("../models/Shelter");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Shelters", () => {
  beforeEach((done) => {
    Shelter.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET Shelters", () => {
    it("it should GET all the Shelters", (done) => {
      chai
        .request(app)
        .get("/shelters")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST Shelter", () => {
    it("it should new POST a Shelter", (done) => {
      let shelter = {
        name: "shelter",
        description: "shelter",
        email: "shelter@gmail.com",
        birth_date: Date.now(),
        phone_number: "+351 999999999",
        country: "Portugal",
        city: "Braga",
        postal_code: "47050-000",
        address: "Rua Manuel faria",
        createdAt: Date.now(),
    };
      chai
        .request(app)
        .post("/shelters")
        .send(shelter)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id Animal", () => {
    it("it should GET a Animal by the id", (done) => {
      let shelter = new Shelter({
        name: "shelter",
        description: "shelter",
        email: "shelter@gmail.com",
        birth_date: Date.now(),
        phone_number: "+351 999999999",
        country: "Portugal",
        city: "Braga",
        postal_code: "47050-000",
        address: "Rua Manuel faria",
        createdAt: Date.now(),
    });
    shelter.save((err, shelter) => {
        chai
          .request(app)
          .get("/shelters/" + shelter.id)
          .send(shelter)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id Shelter", () => {
    it("it should UPDATE a Shelter given the id", (done) => {
      let shelter = new Shelter({
        name: "shelter",
        description: "shelter",
        email: "shelter@gmail.com",
        birth_date: Date.now(),
        phone_number: "+351 999999999",
        country: "Portugal",
        city: "Braga",
        postal_code: "47050-000",
        address: "Rua Manuel faria",
        createdAt: Date.now(),
    });
    shelter.save((err, shelter) => {
        console.log(shelter.id);
        chai
          .request(app)
          .put("/shelters/" + shelter.id)
          .send({
            name: "shelter",
            description: "shelter",
            email: "shelter@gmail.com",
            birth_date: Date.now(),
            phone_number: "+351 999999999",
            country: "Portugal",
            city: "Braga",
            postal_code: "47050-000",
            address: "Rua Manuel faria",
            createdAt: Date.now(),
        })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id Shelter", () => {
    it("it should DELETE a Shelter given the id", (done) => {
      let shelter = new Shelter({
        name: "shelter",
        description: "shelter",
        email: "shelter@gmail.com",
        birth_date: Date.now(),
        phone_number: "+351 999999999",
        country: "Portugal",
        city: "Braga",
        postal_code: "47050-000",
        address: "Rua Manuel faria",
        createdAt: Date.now(),
    });
    shelter.save((err, shelter) => {
        chai
          .request(app)
          .delete("/shelters/" + shelter.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});
