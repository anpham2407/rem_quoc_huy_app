const Joi = require('joi');

const createTest = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  createTest,
};
