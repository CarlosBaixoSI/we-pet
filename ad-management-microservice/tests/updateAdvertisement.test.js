const {updateAdvertisement} = require('../controllers/advertisementController');
const AdvertisementModel = require('../models/advertisementModel');

// mock module to avoid making database calls
jest.mock('../models/advertisementModel');

const advertisementData = {
    city: "updated_city"
};

const expectedData = {
    _id: "123",
    description: "test",
    city: "updated_city",
    rating_avg: 1,
    createdAt: new Date(),
    user_id: "test",
}

test('should update an advertisement', async () => {
    const req = {
        params: {
            id: "123"
        },
        body: advertisementData
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the findOneAndUpdate() method to return the advertisementData
    AdvertisementModel.findOneAndUpdate.mockResolvedValue(advertisementData);
    AdvertisementModel.findById.mockResolvedValue(expectedData);

    await updateAdvertisement(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: expectedData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})
