const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const { getAllShelters } = require("../controllers/ShelterController");
const ShelterModel = require("../models/Shelter");

jest.mock("../models/Shelter");

const shelterData = {
    _id: "123",
    name: "test",
    address: "test",
    createdAt: new Date(),
    user_id: "test",
    isVerified: false,
    description: "test",
    email: "test@email",
    postal_code: "test",
    city: "test",
    country: "test",
    phone_number: "test",
    user_id: "test",
};


// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

const error = new Error("Database error");

test("should get all shelters", async () => {
    const req = {
        headers: {
            'authorization': "Bearer token",
          }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the create method of the ShelterModel to return the created shelter data
    ShelterModel.find.mockResolvedValue([shelterData]);

    await getAllShelters(req, res);
    expect(res.json).toHaveBeenCalledWith({ data: [shelterData], status: "success" });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while getting all shelters", async () => {
    const req = {};
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to throw an error.
    ShelterModel.find.mockRejectedValue(error);

    await getAllShelters(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
})