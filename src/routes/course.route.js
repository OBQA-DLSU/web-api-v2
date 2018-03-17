const express = require('express');
const passport = require('passport');
const ExpressJoi = require('express-joi-validator');
require('../services/passport.service');
const RequireAuth = passport.authenticate('jwt', { session: false });
const CourseRouter = express.Router();
const Course = require('../api/course');
const CourseValidation = require('../validation/course.validation');


CourseRouter.route('/:ProgramId')
.get(
  /* RequireAuth, */
  ExpressJoi(CourseValidation.getSchema),
  Course.getProgramCourse
)
.post(
  /* RequireAuth, */
  ExpressJoi(CourseValidation.createSchema),
  Course.createProgramCourse
)

CourseRouter.route('/programCourse/:id')
.get(
  /* RequireAuth, */
  ExpressJoi(CourseValidation.getSchema),
  Course.getProgramCourseById
)
.put(
  /* RequireAuth, */
  ExpressJoi(CourseValidation.updateSchema),
  Course.updateProgramCourse
)
.patch(
  /* RequireAuth, */
  ExpressJoi(CourseValidation.updateToBeAssessedSchema),
  Course.updateToBeAssessed
)
.delete(
  /* RequireAuth, */
  Course.deleteProgramCourse
);

CourseRouter.route('/bulk/:ProgramId')
.post(
  /* RequireAuth, */
  ExpressJoi(CourseValidation.bulkCreateSchema),
  Course.createBulkProgramCourse
);

module.exports = CourseRouter;
