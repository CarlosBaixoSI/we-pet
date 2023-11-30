const { getAllAdvertisements } = require("../controllers/advertisementController");
const AdvertisementModel = require("../models/advertisementModel");

// mock module to avoid making database calls
jest.mock("../models/advertisementModel");

const response = {
  data: [
    {
      description: "test",
      city: "test",
      rating_avg: 1,
      createdAt: new Date(),
      user_id: "test"
    }
  ],
  status: "Success"
}
const error = new Error("Database error");

test("should get all advertisements", async () => {
  const req = {};
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res)
  };

  // Mock the find() method to return the response variable
  AdvertisementModel.find.mockResolvedValue(response["data"]);

  await getAllAdvertisements(req, res);

  expect(res.json).toHaveBeenCalledWith({ data: response.data, status: "Success" });
  expect(res.status).not.toHaveBeenCalled();
});


test("should handle error while getting all advertisements", async () => {
  const req = {};
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res)
  };

  // Mock the find() method to throw an error.
  AdvertisementModel.find.mockRejectedValue(error);

  await getAllAdvertisements(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.status().json).toHaveBeenCalledWith({ error: error.message });
});
