const {getAnimalsByShelterId} =  require("../controllers/AnimalController");
const AnimalModel = require("../models/Animal");

// mock module to avoid making database calls
jest.mock("../models/Animal");

const animalData = {
    data: [
      {
        birth_date: new Date(),
        description: "test",
        gender: "male",
        size: "test",
        animal_type: "test",
        breed: "test",
        user_id: "test",
        shelter_id: "test"
      },
    ],
    status: "Success",
  };

const error = new Error("Database error");

test("should get animals by shelter id", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to return the response variable
    AnimalModel.find.mockResolvedValue(animalData["data"]);

    await getAnimalsByShelterId(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: animalData.data, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while getting animals by shelter id", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to throw an error.
    AnimalModel.find.mockRejectedValue(error);

    await getAnimalsByShelterId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
})
