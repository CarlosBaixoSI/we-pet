const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const {insertDonation} =  require("../controllers/donationsController");
const DonationModel = require("../models/donationsModel");

// mock module to avoid making database calls
jest.mock("../models/donationsModel");

const donationData = {
    data: {
        amount: 1,
        createdAt: new Date(),
        user_id: "test",
        shelter_id: "test"
    },
    status: "Success"
}

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

const error = new Error("Database error");

test("should insert donation", async () => {
    const req = {
        body: {
            amount: 1,
            user_id: "test",
            shelter_id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    mock
      .onGet(`http://localhost:3000/shelters/${req.body.shelter_id}`)
      .reply(200, { data: "mocked response" });

    mock.onGet(`http://localhost:3000/users/${req.body.user_id}`).reply(200, {
      data: "mocked response",
    });

    // Mock the save() method to return the response variable
    DonationModel.create.mockResolvedValue(donationData["data"]);

    await insertDonation(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: donationData.data, status: donationData.status });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while inserting donation", async () => {
    const req = {
        body: {
            amount: 1,
            user_id: "test",
            shelter_id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the save() method to throw an error
    DonationModel.create.mockRejectedValue(error);

    await insertDonation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
})
