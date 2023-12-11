const { getAnimalById } = require("../controllers/AnimalController");
const AnimalModel = require("../models/Animal");

// mock module to avoid making database calls
jest.mock("../models/Animal");

const animalData = {
    data:
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
    status: "Success",
};

const error = new Error("Database error");

test("should get an animal by id", async () => {
    const req = {
        params: {
            id: animalData.data._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findById() method to return the animalData
    AnimalModel.findById.mockResolvedValue(animalData.data);

    await getAnimalById(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: animalData.data, status: animalData.status });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while getting an animal by id", async () => {
    const req = {
        params: {
            id: animalData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findById() method to throw an error
    AnimalModel.findById.mockRejectedValue(error);

    await getAnimalById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
})