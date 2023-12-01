const { createAdvertisement } = require("../controllers/advertisementController");
const AdvertisementModel = require("../models/advertisementModel");

jest.mock("../models/advertisementModel");

const advertisementData = {
  description: "test",
  city: "test",
  rating_avg: 1,
  createdAt: new Date(),
  user_id: "test"
};

test("should create an advertisement", async () => {
  const req = {
    body: advertisementData
  };
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res)
  };

  // Mock the create method of the AdvertisementModel to return the created advertisement data
  AdvertisementModel.create.mockResolvedValue(advertisementData);

  await createAdvertisement(req, res);

  expect(res.json).toHaveBeenCalledWith({ data: advertisementData, status: "Success" });
  expect(res.status).not.toHaveBeenCalled();
});

test("should handle error while creating an advertisement", async () => {
    const req = {
      body: advertisementData
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    // Mock the create method of the AdvertisementModel to throw an error
    const errorMessage = "Failed to create advertisement";
    AdvertisementModel.create.mockRejectedValue(new Error(errorMessage));

    await createAdvertisement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: errorMessage });
  });
