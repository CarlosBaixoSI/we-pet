const {deleteAdvertisement} = require("../controllers/advertisementController");
const AdvertisementModel = require("../models/advertisementModel");

jest.mock("../models/advertisementModel");

const advertisementData = {
    _id: "123",
    description: "test",
    city: "test",
    rating_avg: 1,
    createdAt: new Date(),
    user_id: "test",
};

test("should delete an advertisement", async () => {
    const req = {
        params: {
            id: advertisementData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    AdvertisementModel.findById.mockResolvedValue(advertisementData);
    // Mock the findByIdAndDelete method of the AdvertisementModel to return the deleted advertisement data
    AdvertisementModel.findByIdAndDelete.mockResolvedValue(advertisementData);

    await deleteAdvertisement(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: advertisementData, status: "Successfully deleted" });
    expect(res.status).not.toHaveBeenCalled();
})

test("should handle error while deleting an advertisement", async () => {
    const req = {
        params: {
            id: advertisementData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findByIdAndDelete method of the AdvertisementModel to throw an error
    const errorMessage = "Failed to delete advertisement";
    AdvertisementModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await deleteAdvertisement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: errorMessage });
})