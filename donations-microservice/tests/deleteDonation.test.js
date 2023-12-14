const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const { deleteDonation } =  require("../controllers/donationsController");
const DonationModel = require("../models/donationsModel");

// Mock module to avoid making database calls
jest.mock("../models/donationsModel");

const response = {
  data: {
    amount: 1,
    createdAt: new Date(),
    user_id: "test",
    shelter_id: "test"
  },
  status: "Success"
};

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

const error = new Error("Database error");

test("should delete donation by id", async () => {
  const req = {
    params: {
      id: "test"
    },
    headers: {
      'authorization': "Bearer token",
    }
  };
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res)
  };

  // Mock the findByIdAndDelete() method to return the response variable
  DonationModel.findByIdAndDelete.mockResolvedValue(response["data"]);

  mock.onGet(`http://localhost:3000/auth/getRole`).reply(200, { role: 'admin' });

  await deleteDonation(req, res);

  expect(res.json).toHaveBeenCalledWith({ data: response.data, status: "Success" });
  expect(res.status).not.toHaveBeenCalled();
});

test("should handle error while deleting donation", async () => {
  const req = {
    params: {
      id: "test"
    },
    headers: {
      'authorization': "Bearer token",
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
  expect(res.json).toHaveBeenCalledWith({ error: error.message });
});