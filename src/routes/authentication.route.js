const express = require('express');
const passport = require('passport');
require('../services/passport.service');
const requireSignin = passport.authenticate('local', { session: false });
const Authentication = require('../api/authentication');
const AuthRoute = express.Router();
const ExpressJoi = require('express-joi-validator');
const AuthValidation = require('../validation/authentication.validation');

AuthRoute.route('/signin')
.post(
  ExpressJoi(AuthValidation.signinBodySchema),
  requireSignin,
  Authentication.signin
);

AuthRoute.route('/signup')
.post(
  ExpressJoi(AuthValidation.signupBodySchema),
  Authentication.signup
);

// authRoute.route('/password')
// .post(Authentication.retrievePassword)
// .put(requireSignin, Authentication.changePassword)

module.exports = AuthRoute;
