const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const { getShelterById } = require("../controllers/ShelterController");
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


test("should get shelter by id", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findOne() method to return the response variable
    ShelterModel.findById.mockResolvedValue(shelterData);

    await getShelterById(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: shelterData, status: "success" });
    expect(res.status).not.toHaveBeenCalled();
})