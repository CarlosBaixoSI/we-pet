const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
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
    user_id: "test",
    shelter_id: "test"
};

const error = new Error('Database error');

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

test('should update an animal', async () => {
    const req = {
        params: {
            id: expectedData._id
        },
        body: {
            name: dataToUpdate.name
        },
        headers: {
            'authorization': 'Bearer token'
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findByIdAndUpdate method of the Animal Model to return the updated animal data
    AnimalModel.findByIdAndUpdate.mockResolvedValue(expectedData);
    AnimalModel.findById.mockResolvedValue(expectedData)

    mock.onGet(`http://localhost:3000/auth/getRole`).reply(200, { role: 'admin' });

    await updateAnimal(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: expectedData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})