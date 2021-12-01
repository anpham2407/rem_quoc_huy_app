const { Test } = require('../models');

/**
 * Create a user
 * @param {Object} testBody
 * @returns {Promise<Test>}
 */
const createTest = async (testBody) => {
  return Test.create(testBody);
};
module.exports = {
  createTest,
};
