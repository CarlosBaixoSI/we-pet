const {deleteDonation} =  require("../controllers/donationsController");
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

test("should delete donation by id", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findByIdAndDelete() method to return the response variable
    DonationModel.findByIdAndDelete.mockResolvedValue(response["data"]);

    await deleteDonation(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: response.data, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while deleting donation", async () => {
    const req = {
        params: {
            id: "test"
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findByIdAndDelete() method to throw an error
    DonationModel.findByIdAndDelete.mockRejectedValue(error);

    await deleteDonation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
})
