const Joi = require('joi');

const getSchema = {
  query: {
    flat: Joi.boolean(),
    queryObject: Joi.object(),
    toBeAssessed: Joi.boolean()
  }
};

const createSchema = {
  body: {
    code: Joi.string().min(7).max(7).required(),
    description: Joi.string()
  }
};

const updateSchema = {
  body: {
    CourseId: Joi.number().required(),
    description: Joi.string()
  }
};

const bulkCreateSchema = {
  body: {
    dataArray: Joi.array().required()
  }
}

module.exports = {
  getSchema: getSchema,
  createSchema: createSchema,
  updateSchema: updateSchema,
  bulkCreateSchema: bulkCreateSchema
};
