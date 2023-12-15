const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const { createShelter } = require("../controllers/ShelterController");
const ShelterModel = require("../models/Shelter");

jest.mock("../models/Shelter");

const shelterData = {
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

test("should create a shelter", async () => {
    const req = {
        body: shelterData,
        headers: {
            'authorization': "Bearer token",
          }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the create method of the ShelterModel to return the created shelter data
    ShelterModel.create.mockResolvedValue(shelterData);

    mock.onGet(`http://localhost:3000/auth/getUserEmail`).reply(200, {
        user_email: "test@email",
    });

    // Mock the response for getting the user ID
    mock.onPost(`http://localhost:3000/users/getUserIDByEmail`).reply(200, {
        data: {
        _id: "test-user-id",
        },
    });

    await createShelter(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: shelterData, status: "success" });
    expect(res.status).not.toHaveBeenCalled();

})

test("should handle error while creating a shelter", async () => {
    const req = {
        body: shelterData,
        headers: {
            'authorization': "Bearer token",
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res),
    };

    // Mock the create method of the ShelterModel to throw an error
    const errorMessage = "Failed getting user ID";

    mock.onGet(`http://localhost:3000/auth/getUserEmail`).reply(200, {
        user_email: "test@email",
    });

    mock.onPost(`http://localhost:3000/users/getUserIDByEmail`).reply(200, {
        data: {
        _id: "test-user-id",
        },
    })

    // Mock the create method of the ShelterModel to throw an error
    ShelterModel.create.mockRejectedValue(new Error(errorMessage));

    await createShelter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: errorMessage });
})
