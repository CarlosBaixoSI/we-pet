const {deleteAnimal} = require("../controllers/AnimalController")
const AnimalModel = require("../models/Animal");

jest.mock("../models/animal");

const animalData = {
    _id: "123",
    name: "test",
    birth_date: new Date(),
    description: "test",
    gender: "male",
    size: "test",
    animal_type: "test",
    breed: "test",
    user_id: "test",
    shelter_id: "test"
};

test("should delete an animal", async () => {
    const req = {
        params: {
            id: animalData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    }

    AnimalModel.findById.mockResolvedValue(animalData);
    AnimalModel.findByIdAndDelete.mockResolvedValue(animalData);

    await deleteAnimal(req, res);

    expect(res.json).toHaveBeenCalledWith({data: animalData, status: "Successfully deleted"});
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while deleting an animal", async () => {
    const req = {
        params: {
            id: animalData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    }

    // Mock the findByIdAndDelete method of the Animal Model to throw an error
    const errorMessage = "Failed to delete advertisement";
    AnimalModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await deleteAnimal(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({error: errorMessage});
})
