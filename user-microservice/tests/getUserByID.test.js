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

test('should get a user', async () => {
    const req = {
        params: {
            id: userData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    UserModel.findById.mockResolvedValue(userData);

    await getUserByID(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: userData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test('should handle error while getting a user', async () => {
    const req = {
        params: {
            id: userData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findById method of the UserModel to throw an error
    UserModel.findById.mockRejectedValue(new Error('Failed to get user'));

    await getUserByID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: 'Failed to get user' });
})
