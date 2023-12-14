const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { updateUser } = require('../controllers/userController');
const UserModel = require('../models/userModel');

jest.mock('../models/userModel');

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

const userData = {
  _id: '123',
  name: 'test',
  email: 'test',
  birth_date: new Date(),
  phoneNumber: 'test',
  updatedAt: new Date(),
  createdAt: new Date(),
  address: 'test',
  city: 'test',
};

const updated_data = {
  _id: '123',
  name: 'updated_test',
  email: 'test',
  birth_date: new Date(),
  phoneNumber: 'test',
  updatedAt: new Date(),
  createdAt: new Date(),
  address: 'test',
  city: 'test',
};

test('should update a user', async () => {
  const req = {
    params: {
      id: '123',
    },
    headers: {
      authorization: 'Bearer token',
    },
    body: updated_data,
  };
  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };

  mock.onGet('http://localhost:3000/auth/getUserEmail').reply(200, { userData });

  UserModel.findByIdAndUpdate.mockResolvedValue(updated_data);
  UserModel.findOne.mockResolvedValue(updated_data);

  await updateUser(req, res);

  expect(res.json).toHaveBeenCalledWith({ data: updated_data, status: 'Success' });
  expect(res.status).not.toHaveBeenCalled();
});
