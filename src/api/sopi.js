const ErrorHelper = require('../helpers/error.helper');
const SopiHelper = require('../helpers/sopi.helper');
const ProgramSopiHelper = require('../helpers/programSopi.helper');

const getProgramSopiWithQueryObject = async (req, res, next) => {
  try {
    let queryObject;
    if (req.query.queryObjectArray) {
      queryObject = req.query.queryObject;
    } else {
      // can be edited depending on req.query in the future
      queryObject = {};
    }
    const getProgramSopi = await ProgramSopiHelper.getOneProgramSopiByQueryObject(queryObject);
    if (getProgramSopi.err) {
      return next(ErrorHelper.clientError(getProgramSopi.err));
    }
    req.data = getProgramSopi.programSopis;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
}

const getProgramSopi = async (req, res, next) => {
  const { ProgramId } = req.params;
  try {
    const queryObject = {ProgramId: ProgramId};
    const flat = (req.query.flat === true) ? true : false;
    const getPS = await ProgramSopiHelper.getProgramSopi(queryObject, flat);
    if (getPS.err) {
      return next(ErrorHelper.clientError(getPS.err, 401));
    }
    req.data = getPS.programSopis;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const createProgramSopi = async (req, res, next) => {
  const { ProgramId } = req.params;
  const { So, code, description } = req.body;
  try {
    const flat = (req.query && req.query.flat === true) ? true : false;
    const createPS = await ProgramSopiHelper.createProgramSopiFromInput({ProgramId, So, code, description}, flat);
    if (createPS.err) { return next(ErrorHelper.clientError(createPS.err)); }
    req.data = createPS.programSopi;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
}

const getOneProgramSopi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const flat = (req.query.flat === true) ? true : false;
    const getPSById = await ProgramSopiHelper.getOneProgramSopiByQueryObject({id: id}, flat);
    if (getPSById.err) {
      return next(ErrorHelper.clientError(getPSById.err));
    }
    req.data = getPSById.programSopi;
    next();
  }
  catch (e) {
    console.log(e);
    next(ErrorHelper.serverError(e));
  }
};

const updateProgramSopi = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { So, code, description } = req.body;
    const flat = (req.query.flat === true) ? true : false;
    const updatePS = await ProgramSopiHelper.updateProgramSopiFromInput(id, {So, code, description}, flat);
    if (updatePS.err) { return next(ErrorHelper.clientError(updatePS.err)); }
    req.data = updatePS.programSopi;
    next();
  }
  catch (e) {
    console.log(e);
    next(ErrorHelper.serverError(e));
  }
};

const deleteProgramSopi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletePS = await ProgramSopiHelper.deleteProgramSopi(id);
    if (deletePS.err) {
      return next(ErrorHelper.clientError(updatePS.err));
    }
    req.data = { count: deletePS.count };
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const bulkCreateProgramSopi = async (req, res, next) => {
  try {
    const { ProgramId } = req.params;
    const { dataArray } = req.body;
    const flat = (req.query.flat === true) ? true : false;
    const bulkCreate = await ProgramSopiHelper.bulkCreateProgramSopi(dataArray, ProgramId, flat);
    req.data = bulkCreate;
    next();
  }
  catch (e) {
    console.log(e);
    next(ErrorHelper.serverError(e));
  }
};

module.exports = {
  getProgramSopiWithQueryObject: getProgramSopiWithQueryObject,
  getProgramSopi: getProgramSopi,
  createProgramSopi: createProgramSopi,
  getOneProgramSopi: getOneProgramSopi,
  updateProgramSopi: updateProgramSopi,
  deleteProgramSopi: deleteProgramSopi,
  bulkCreateProgramSopi: bulkCreateProgramSopi
};
