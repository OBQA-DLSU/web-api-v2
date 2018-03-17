const Joi = require('joi');

const getSchema = {
  query: {
    flat: Joi.boolean(),
    queryObject: Joi.object(),
    toBeAssessed: Joi.boolean()
  }
};

const createSchema = {
  query: {
    flat: Joi.boolean()
  },
  body: {
    code: Joi.string().min(7).required(),
    name: Joi.string().required(),
    toBeAssessed: Joi.boolean(),
    description: Joi.string().required()
  }
};

const updateSchema = {
  query: {
    flat: Joi.boolean()
  },
  body: {
    ProgramCourseId: Joi.number().required(),
    description: Joi.string(),
    code: Joi.string(),
    toBeAssessed: Joi.boolean(),
    name: Joi.string()
  }
};

const updateToBeAssessedSchema = {
  query: {
    flat: Joi.boolean()
  },
  body: {
    toBeAssessed: Joi.boolean()
  }
}

const bulkCreateSchema = {
  body: {
    dataArray: Joi.array().required()
  }
}

module.exports = {
  getSchema: getSchema,
  createSchema: createSchema,
  updateSchema: updateSchema,
  bulkCreateSchema: bulkCreateSchema,
  updateToBeAssessedSchema: updateToBeAssessedSchema
};
