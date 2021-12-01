const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { testService } = require('../services');

const createTest = catchAsync(async (req, res) => {
  const test = await testService.createTest(req.body);
  res.status(httpStatus.CREATED).send(test);
});

module.exports = {
  createTest,
};
