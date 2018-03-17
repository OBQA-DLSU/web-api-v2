const express = require('express');
const passport = require('passport');
const ExpressJoi = require('express-joi-validator');
require('../services/passport.service');
const RequireAuth = passport.authenticate('jwt', {session: false});
const Sopi = require('../api/sopi');
const SopiRoute = express.Router();
const SopiValidation = require('../validation/sopi.validation');

SopiRoute.route('/')
.get(
  /* RequireAuth, */
  ExpressJoi(SopiValidation.getQuerySchema),
  Sopi.getProgramSopiWithQueryObject
);

SopiRoute.route('/program/:ProgramId')
.get(
  /* RequireAuth, */
  ExpressJoi(SopiValidation.getQuerySchema),
  Sopi.getProgramSopi)
.post(
  /* RequireAuth, */
  ExpressJoi(SopiValidation.sopiBodySchema),
  Sopi.createProgramSopi
);

SopiRoute.route('/programSopi/:id')
.get(
  /* RequireAuth, */
  ExpressJoi(SopiValidation.getQuerySchema),
  Sopi.getOneProgramSopi
)
.put(
  /* RequireAuth, */
  ExpressJoi(SopiValidation.sopiBodySchema),
  Sopi.updateProgramSopi
)
.delete(
  /* RequireAuth, */
  Sopi.deleteProgramSopi
);

SopiRoute.route('/bulk/:ProgramId')
.post(
  /* RequireAuth, */
  ExpressJoi(SopiValidation.sopiBulkSchema),
  Sopi.bulkCreateProgramSopi
);

module.exports = SopiRoute;