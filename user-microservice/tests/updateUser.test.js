const {updateUser} = require('../controllers/userController')
const UserModel = require('../models/userModel')

jest.mock('../models/userModel')

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

const updated_data = {
    _id: "123",
    name: "updated_test",
    birth_date: new Date(),
    phoneNumber: "test",
    updatedAt: new Date(),
    createdAt: new Date(),
    address: "test",
    city: "test",
}

test('should update a user', async () => {
    const req = {
        params: {
            id: "123"
        },
        body: updated_data
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    UserModel.findByIdAndUpdate.mockResolvedValue(userData);
    UserModel.findById.mockResolvedValue(updated_data);

    await updateUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: updated_data, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test('should handle error while updating a user', async () => {
    const req = {
        params: {
            id: "123"
        },
        body: userData
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    UserModel.findByIdAndUpdate.mockRejectedValue(new Error('Failed to update user'));
    UserModel.findById.mockResolvedValue(userData);

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: 'Failed to update user' });
})