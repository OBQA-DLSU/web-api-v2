const Joi = require('joi');

const invitationBodySchema = {
  body: {
    invitationItems: Joi.array().required()
  }
};

module.exports = {
  invitationBodySchema: invitationBodySchema
};