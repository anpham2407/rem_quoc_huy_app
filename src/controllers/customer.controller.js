const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');

const createCustomer = catchAsync(async (req, res) => {
  const order = await customerService.createCustomer(req.body);
  res.status(httpStatus.CREATED).send(order);
});

const getCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await customerService.queryCustomers(filter, options);
  res.send(result);
});

const getCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  res.send(customer);
});

const updateCustomer = catchAsync(async (req, res) => {
  const user = await customerService.updateCustomerById(req.params.customerId, req.body);
  res.send(user);
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer
};
