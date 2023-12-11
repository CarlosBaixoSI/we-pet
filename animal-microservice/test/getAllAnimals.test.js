const { getAllAnimals } = require("../controllers/AnimalController");
const AnimalModel = require("../models/Animal");

jest.mock("../models/Animal");

const animalData = {
  data: [
    {
      _id: "123",
      name: "test",
      birth_date: new Date(),
      description: "test",
      gender: "male",
      size: "test",
      animal_type: "test",
      breed: "test",
    },
  ],
  status: "Success",
};

const error = new Error("Database error");


test("should get all animals", async () => {
  const req = {};
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };

  //Mock the find() method to return the animalData
  AnimalModel.find.mockResolvedValue(animalData.data);

  await getAllAnimals(req, res);

  expect(res.json).toHaveBeenCalledWith({data: animalData.data, status: animalData.status})
});

test("should handle error while getting all animals", async () => {
    const req = {};
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    //Mock the find() method to throw an error.
    AnimalModel.find.mockRejectedValue(error);

    await getAllAnimals(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({error: error.message});
})
