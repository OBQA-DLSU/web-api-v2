const Joi = require('joi');

const getQuerySchema = {
  query: {
    flat: Joi.boolean(),
    queryObject: Joi.object()
  }
};

const sopiBodySchema = {
  query: {
    flat: Joi.boolean()
  },
  body: {
    id: Joi.number(),
    So: Joi.string().min(1).max(1).required(),
    code: Joi.string().min(2).max(2).required(),
    description: Joi.string()
  }
};

const sopiBulkSchema = {
  query: {
    flat: Joi.boolean()
  },
  body: {
    dataArray: Joi.array()
  }
}

module.exports = {
  sopiBodySchema: sopiBodySchema,
  getQuerySchema: getQuerySchema,
  sopiBulkSchema: sopiBulkSchema
};
