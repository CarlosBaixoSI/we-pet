const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const { createAnimal } = require("../controllers/AnimalController");
const AnimalsModel = require("../models/Animal");

jest.mock("../models/Animal");

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

const animalData = {
  name: "test",
  birth_date: new Date(),
  description: "test",
  gender: "male",
  size: "test",
  animal_type: "test",
  breed: "test",
  user_id: "656a22e0ded04b4b42b5e8e5",
  shelter_id: "656a22e0ded04b4b42b5e8e5",
};

test("should create an animal", async () => {
  const req = {
    body: {
      ...animalData,
      user_id: "test_id",
      shelter_id: "test_id",
    },
  };
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };

  mock
    .onGet(`http://we-pet-gateway-microservice-1:3000/shelters/${req.body.shelter_id}`)
    .reply(200, { data: "mocked response" });

  mock.onGet(`http://we-pet-gateway-microservice-1:3000/users/${req.body.user_id}`).reply(200, {
    data: "mocked response",
  });

  // Mock the create method of the AnimalModel to return the created animal data
  AnimalsModel.create.mockResolvedValue(animalData);

  await createAnimal(req, res);

  expect(res.json).toHaveBeenCalledWith({
    data: animalData,
    status: "Success",
  });
  expect(res.status).not.toHaveBeenCalled();
});

test("should handle error while creating an animal", async () => {
  const req = {
    body: {
      ...animalData,
      user_id: "test_id",
      shelter_id: "test_id",
    },
  };
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };

  mock
    .onGet(`http://localhost:3000/shelters/${req.body.shelter_id}`)
    .reply(200, { data: "mocked response" });

  mock.onGet(`http://localhost:3000/users/${req.body.user_id}`).reply(200, {
    data: "mocked response",
  });

  //Mock the create method of Animal model to throw an error
  const errorMessage = "Failed to create animal";
  AnimalsModel.create.mockRejectedValue(new Error(errorMessage));

  await createAnimal(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.status().json).toHaveBeenCalledWith({ error: errorMessage });
});
