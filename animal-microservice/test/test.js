const Animal = require("../models/Animal");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Animals", () => {
  beforeEach((done) => {
    Animal.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET Animal", () => {
    it("it should GET all the Animals", (done) => {
      chai
        .request(app)
        .get("/animals")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST Animal", () => {
    it("it should new POST a Animal", (done) => {
      let animal = {
        name: "minie",
        birth_date: Date.now(),
        description: "minie",
        gender: "male",
        size: "small",
        animal_type: "cat",
        breed: "british shorthair",
        createdAt: Date.now(),
    };
      chai
        .request(app)
        .post("/animals")
        .send(animal)
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
      let animal = new Animal({
        name: "minie",
        birth_date: Date.now(),
        description: "minie",
        gender: "male",
        size: "small",
        animal_type: "cat",
        breed: "british shorthair",
        createdAt: Date.now(),
    });
    animal.save((err, animal) => {
        chai
          .request(app)
          .get("/animals/" + animal.id)
          .send(animal)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id animal", () => {
    it("it should UPDATE a animal given the id", (done) => {
      let animal = new Animal({
        name: "minie",
        birth_date: Date.now(),
        description: "minie",
        gender: "male",
        size: "small",
        animal_type: "cat",
        breed: "british shorthair",
        createdAt: Date.now(),
    });
    animal.save((err, animal) => {
        console.log(animal.id);
        chai
          .request(app)
          .put("/animals/" + animal.id)
          .send({
            name: "minie",
            birth_date: Date.now(),
            description: "minie",
            gender: "male",
            size: "small",
            animal_type: "cat",
            breed: "british shorthair",
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
  describe("/DELETE/:id animal", () => {
    it("it should DELETE a animal given the id", (done) => {
      let animal = new Animal({
        name: "minie",
        birth_date: Date.now(),
        description: "minie",
        gender: "male",
        size: "small",
        animal_type: "cat",
        breed: "british shorthair",
        createdAt: Date.now(),
    });
    animal.save((err, animal) => {
        chai
          .request(app)
          .delete("/animals/" + animal.id)
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
