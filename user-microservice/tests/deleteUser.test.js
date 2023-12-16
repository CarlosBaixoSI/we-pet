const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const {deleteUser} = require('../controllers/userController');
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

test('should delete a user', async () => {
    const req = {
        params: {
            id: userData._id
        },
        headers: {
            authorization: 'Bearer token'
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    UserModel.findById.mockResolvedValue(userData);

    // Mock the findByIdAndDelete method of the UserModel to return the deleted user data
    UserModel.findByIdAndDelete.mockResolvedValue(userData);

    mock.onGet(`http://localhost:3000/auth/getRole`).reply(200, { role: 'admin' });

    await deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: userData, status: "Successfully deleted" });
    expect(res.status).not.toHaveBeenCalled();
})

test('should handle error while deleting a user', async () => {
    const req = {
        params: {
            id: userData._id
        },
        headers: {
            authorization: 'Bearer token'
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    mock.onGet(`http://localhost:3000/auth/getRole`).reply(200, { role: 'admin' });

    // Mock the findByIdAndDelete method of the UserModel to throw an error
    UserModel.findByIdAndDelete.mockRejectedValue(new Error('Failed to delete user'));

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: 'Failed to delete user' });
})
