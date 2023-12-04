const {getDonationByID} = require("../controllers/donationsController");
const DonationModel = require("../models/donationsModel");

// mock module to avoid making database calls
jest.mock("../models/donationsModel");

const response = {
    data: {
        amount: 1,
        createdAt: new Date(),
        user_id: "test",
        shelter_id: "test"
    },
    status: "Success"
}

const error = new Error("Database error");

test("should get donation by id", async () => {
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
    DonationModel.findById.mockResolvedValue(response["data"]);

    await getDonationByID(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: response.data, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while getting donation by id", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findOne() method to throw an error
    DonationModel.findById.mockRejectedValue(error);

    await getDonationByID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
})
