const ErrorHelper = require('../helpers/error.helper');
const ProgramCourseHelper = require('../helpers/programCourse.helper');

const getProgramCourse = async (req, res, next) => {
  try {
    let queryObject;
    if (req.query && req.query.queryObject) {
      queryObject = req.query.queryObject;
    } else if ((req.query && req.query.toBeAssessed) || req.query.toBeAssessed === false) {
      queryObject = (req.query.toBeAssessed === true) ? { toBeAssessed: true } : { toBeAssessed: false };
    } else {
      queryObject = {};
    }
    const flat = (req.query.flat === true) ? true : false;
    const getPC = await ProgramCourseHelper.getProgramCourseByQueryObject(queryObject, flat);
    if (getPC.err) { return next(ErrorHelper.clientError(getPC.err)); }
    req.data = getPC.programCourses;
    next();
  }
  catch (e) {
    console.log(e);
    next(ErrorHelper.serverError(e));
  }
};

const getProgramCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getPC = await ProgramCourseHelper.getProgramCourseById(id);
    if (getPC.err) { return next(ErrorHelper.clientError(getPC.err)); }
    req.data = getPC.programCourse;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const createProgramCourse = async (req, res, next) => {
  try {
    const { ProgramId } = req.params;
    const flat = (req.query.flat === true) ? true : false;
    const {code, name, description} = req.body;
    const createPC = await ProgramCourseHelper.createProgramCourseFromInput({code, name, ProgramId, description}, flat);
    if (createPC.err) { return next(ErrorHelper.clientError(createPC.err)); }
    req.data = createPC.programCourse;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const updateProgramCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flat = (req.query.flat === true) ? true : false;
    const updatePC = await ProgramCourseHelper.updateProgramCourseFromInput(id, req.body, flat);
    if (updatePC.err) { return next(ErrorHelper.clientError(updatePC.err)); }
    req.data = updatePC.programCourse;
    next();
  }
  catch (e) {
    console.log(e);
    next(ErrorHelper.serverError(e));
  }
};

const deleteProgramCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePC = await ProgramCourseHelper.deleteProgramCourse(id);
    if (deletePC.err) { return next(ErrorHelper.clientError(deletePC.err)); }
    req.data = { count: deletePC.count };
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const createBulkProgramCourse = async (req, res, next) => {
  try {
    const { ProgramId } = req.params;
    const { dataArray } = req.body;
    const createBulkPC = await ProgramCourseHelper.createProgramCourseFromDataArray(dataArray, ProgramId);
    req.data = createBulkPC;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const updateToBeAssessed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { toBeAssessed } = req.body;
    const flat = (req.query.flat === true) ? true : false;
    const updatePC = await ProgramCourseHelper.updateToBeAssessed(id, toBeAssessed, flat);
    if (updatePC.err) { return next(ErrorHelper.clientError(updatePC.err)); }
    req.data = updatePC.programCourse;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};


module.exports = {
  getProgramCourse: getProgramCourse,
  getProgramCourseById: getProgramCourseById,
  createProgramCourse: createProgramCourse,
  updateProgramCourse: updateProgramCourse,
  deleteProgramCourse: deleteProgramCourse,
  createBulkProgramCourse: createBulkProgramCourse,
  updateToBeAssessed: updateToBeAssessed
};
