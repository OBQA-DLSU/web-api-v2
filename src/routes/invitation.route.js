const express = require('express');
const passport = require('passport');
require('../services/passport.service');
const RequireAuth = passport.authenticate('jwt', { session: false });
const Invitation = require('../api/invitation');
const InvitationRoute = express.Router();
const ExpressJoi = require('express-joi-validator');
const InvitationValidation = require('../validation/invitation.validation');

InvitationRoute.route('/')
.post(
  /* RequireAuth, */
  ExpressJoi(InvitationValidation.invitationBodySchema),
  Invitation.invitation
);

module.exports = InvitationRoute;
