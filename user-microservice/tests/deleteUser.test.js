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

test('should delete a user', async () => {
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

    // Mock the findByIdAndDelete method of the UserModel to return the deleted user data
    UserModel.findByIdAndDelete.mockResolvedValue(userData);

    await deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: userData, status: "Successfully deleted" });
    expect(res.status).not.toHaveBeenCalled();
})

test('should handle error while deleting a user', async () => {
    const req = {
        params: {
            id: userData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findByIdAndDelete method of the UserModel to throw an error
    UserModel.findByIdAndDelete.mockRejectedValue(new Error('Failed to delete user'));

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: 'Failed to delete user' });
})
