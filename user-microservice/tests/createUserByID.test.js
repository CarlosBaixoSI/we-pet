const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const {createUserByID} = require("../controllers/userController");
const UserModel = require("../models/userModel");

jest.mock("../models/userModel");

const userData = {
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

test("should create an user", async () => {
    const req = {
        body: userData,
        headers: {
            'authorization': 'Bearer token'
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the create method of the UserModel to return the created user data
    UserModel.create.mockResolvedValue(userData);

    mock.onGet(`http://localhost:3000/auth/getRole`).reply(200, { role: 'admin' });

    await createUserByID(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: userData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while creating an user", async () => {
    const req = {
        body: userData,
        headers: {
            'authorization': 'Bearer token'
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the create method of the UserModel to throw an error
    const errorMessage = "Failed to create user";

    UserModel.create.mockRejectedValue(new Error(errorMessage));

    await createUserByID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: "Failed to create user" });
})
