const { getAdvertisementByUserID } = require('../controllers/advertisementController');
const AdvertisementModel = require('../models/advertisementModel');

// mock module to avoid making database calls
jest.mock('../models/advertisementModel');

const advertisementData = {
    _id: "123",
    description: "test",
    city: "test",
    rating_avg: 1,
    createdAt: new Date(),
    user_id: "test",
};

test('should get an advertisement by id', async () => {
    const req = {
        params: {
            id: advertisementData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to return the advertisementData
    AdvertisementModel.find.mockResolvedValue(advertisementData);

    await getAdvertisementByUserID(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: advertisementData, status: "Success" });
    expect(res.status).not.toHaveBeenCalled();
})

test('should handle error while getting an advertisement by id', async () => {
    const req = {
        params: {
            id: advertisementData._id
        }
    };
    const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
    };

    // Mock the find() method to throw an error
    AdvertisementModel.find.mockRejectedValue(new Error('Database error'));

    await getAdvertisementByUserID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith({ error: 'Database error' });
})
