const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const {getUserByID} = require('../controllers/userController');
const UserModel = require('../models/userModel');

jest.mock('../models/userModel');

const userData = {
    _id: "123",
    name: "test",
    birth_date: new Date(),
    phoneNumber: "test",
    updatedAt: new Date(),
    createdAt: new Date(),
    address: "test",
    city: "test",
}

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

test('should get a user', async () => {
    const req = {
        params: {
            id: userData._id
        },
        headers: {
            'authorization': 'Bearer token'
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    UserModel.findById.mockResolvedValue(userData);

    mock.onGet(`http://localhost:3000/auth/getRole`).reply(200, { role: 'admin' });

    await getUserByID(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: userData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test('should handle error while getting a user', async () => {
    const req = {
        params: {
            id: userData._id
        },
        headers: {
            'authorization': 'Bearer token'
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    mock.onGet(`http://localhost:3000/auth/getRole`).reply(200, { role: 'admin' });


    // Mock the findById method of the UserModel to throw an error
    UserModel.findById.mockRejectedValue(new Error('Failed to get user'));

    await getUserByID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: 'Failed to get user' });
})
