const Joi = require('joi');

const createOrder = {
  body: Joi.object().keys({
    orderId: Joi.string().required(),
    name: Joi.string().required(),
    totalAmount: Joi.number().required(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createOrder,
  getOrders,
};
