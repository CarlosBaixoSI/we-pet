const {createAnimal} = require("../controllers/AnimalController")
const AnimalsModel = require("../models/Animal")

jest.mock("../models/Animal")

const animalData = {
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

test("should create an animal", async () => {
    const req = {
        body: animalData
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the create method of the AnimalModel to return the created animal data
    AnimalsModel.create.mockResolvedValue(animalData);

    await createAnimal(req, res);

    expect(res.json).toHaveBeenCalledWith({data: animalData, status: "Success"})
    expect(res.status).not.toHaveBeenCalled();
});

test("should handle error while creating an animal", async () => {
    const req = {
        body: animalData
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    //Mock the create method of Animal model to throw an error
    const errorMessage = "Failed to create animal"
    AnimalsModel.create.mockRejectedValue(new Error(errorMessage));

    await createAnimal(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({error: errorMessage});
})
