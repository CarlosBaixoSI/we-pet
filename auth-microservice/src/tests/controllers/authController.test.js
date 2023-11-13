const request = require("supertest");
const app = require("../../app");
const apiMessages = require("../../assets/i18n/apiResponses");
const mongoose = require("mongoose");
require("dotenv").config();
/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.ATLAS_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("authController", () => {
  //Successful signup
  describe("POST /signup", () => {
    it("should return 201 status code", async () => {
      const res = await request(app).post("/auth/signup").send({
        email: "newUser@gmail.com",
        username: "newUser",
        password: "passwordNewUser",
      });
      expect(res.statusCode).toEqual(201);
    });
  });

  //Unsuccessful signup
  describe("POST /signup", () => {
    it("should return 409 status code", async () => {
      const res = await request(app).post("/auth/signup").send({
        email: "admin@gmail.com",
        username: "admin",
        password: "passwordadmin",
      });
      expect(res.statusCode).toEqual(apiMessages.usernameAlreadyUsed.code);
      expect(res.body).toHaveProperty("message");
    });
  });

  //Successful login
    describe("GET /login", () => {
        it("should return 200 status code", async () => {
        const res = await request(app).get("/auth/signin").send({
            username: "carlosbaixo.si@gmail.com",
            password: "teste",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
        }
    )}
    );
});
