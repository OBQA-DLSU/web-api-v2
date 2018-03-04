const express = require('express');
const passport = require('passport');
require('../services/passport.service');
const requireSignin = passport.authenticate('local', { session: false });
const Invitation = require('../api/invitation');
const InvitationRoute = express.Router();
const ExpressJoi = require('express-joi-validator');
const InvitationValidation = require('../validation/invitation.validation');

InvitationRoute.route('/')
.post(
  ExpressJoi(InvitationValidation.invitationBodySchema),
  Invitation.invitation
);


// authRoute.route('/password')
// .post(Authentication.retrievePassword)
// .put(requireSignin, Authentication.changePassword)

module.exports = InvitationRoute;
