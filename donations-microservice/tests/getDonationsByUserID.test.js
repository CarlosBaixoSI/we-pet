const {getDonationsByUserID} =  require("../controllers/donationsController");
const DonationModel = require("../models/donationsModel");

// mock module to avoid making database calls
jest.mock("../models/donationsModel");

const response = {
    data: [
        {
            amount: 1,
            createdAt: new Date(),
            user_id: "test",
            shelter_id: "test"
        }
    ],
    status: "Success"
}

const error = new Error("Database error");

test("should get all donations", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to return the response variable
    DonationModel.find.mockResolvedValue(response["data"]);

    await getDonationsByUserID(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: response.data, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while getting all donations", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to throw an error.
    DonationModel.find.mockRejectedValue(error);

    await getDonationsByUserID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
})
