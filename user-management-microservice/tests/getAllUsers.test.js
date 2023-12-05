const {getAllUsers} = require("../controllers/userController");
const UserModel = require("../models/userModel");

jest.mock("../models/userModel");

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

test('should get all users', async () => {
    const req = {};
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to return the response variable
    UserModel.find.mockResolvedValue(userData);

    await getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: userData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test('should handle error while getting all users', async () => {
    const req = {};
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to throw an error
    UserModel.find.mockRejectedValue(new Error('Failed to get users'));

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: 'Failed to get users' });
})
