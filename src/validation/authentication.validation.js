const Joi = require('joi');

const signinBodySchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  }
};

const signupBodySchema = {
  body: {
    idNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    password: Joi.string().min(4).required(),
    confirmation: Joi.string().min(4).required(),
    invitationCode: Joi.string().required()
  }
};

module.exports = {
  signinBodySchema: signinBodySchema,
  signupBodySchema: signupBodySchema
};
