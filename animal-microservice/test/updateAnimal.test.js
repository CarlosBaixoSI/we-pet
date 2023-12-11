const {updateAnimal} = require('../controllers/AnimalController');
const AnimalModel = require('../models/Animal');

jest.mock('../models/Animal');


const dataToUpdate = {
    name: "updated_name",
};

const expectedData = {
    _id: "123",
    name: "updated_name",
    birth_date: new Date(),
    description: "test",
    gender: "male",
    size: "test",
    animal_type: "test",
    breed: "test",
};

const error = new Error('Database error');

test('should update an animal', async () => {
    const req = {
        params: {
            id: expectedData._id
        },
        body: {
            name: dataToUpdate.name
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findByIdAndUpdate method of the Animal Model to return the updated animal data
    AnimalModel.findByIdAndUpdate.mockResolvedValue(expectedData);
    AnimalModel.findById.mockResolvedValue(expectedData)

    await updateAnimal(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: expectedData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})