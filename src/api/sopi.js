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
    const flat = (req.query.flat === 'true') ? true : false;
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
  const { so, code, description } = req.body;
  try {
    let soData, sopiData, programSopiData;
    const flat = (req.query && req.query.flat === 'true') ? true : false;
    const findSo = await SopiHelper.getSoByCode(so);
    if (findSo.err) { return next(ErrorHelper.clientError(findSo.err)); }
    if (!findSo.so) {
      const createSo = await SopiHelper.createSo({code: so});
      if (createSo.err) { return next(ErrorHelper.clientError(createSo.err)); }
      soData = createSo.so;
    } else {
      soData = findSo.so;
    }
    const findSopi = await SopiHelper.getOneSopiByQueryObject({code: code});
    if (findSopi.err) { return next(ErrorHelper.clientError(findSopi.err)); }
    if (findSopi.sopi) {
      sopiData = findSopi.sopi;
    } else {
      const createSopi = await SopiHelper.createSopi({code: code, SoId: soData.id});
      if (createSopi.err) { return next(ErrorHelper.clientError(createSopi.err)); }
      sopiData = createSopi.sopi;
    }
    const findPS = await ProgramSopiHelper.getOneProgramSopiByQueryObject({ProgramId: ProgramId, SopiId: sopiData.id});
    if (findPS.err) { return next(ErrorHelper.clientError(findPS.err)); }
    if (!findPS.programSopi) {
      if (!sopiData.id) {
        return next(ErrorHelper.clientError('no sopi ID'));
      }
      const createPS = await ProgramSopiHelper.createProgramSopi({ProgramId: ProgramId, SopiId: sopiData.id, description});
      if (createPS.err) { return next(ErrorHelper.clientError(createPS.err)); }
      programSopiData = createPS.programSopi;
    } else {
      programSopiData = findPS.programSopi;
    }
    const getProgramSopi = await ProgramSopiHelper.getProgramSopiById(programSopiData.id, flat);
    if (getProgramSopi.err) { return next(ErrorHelper.clientError(getProgramSopi.err)); }
    req.data = getProgramSopi.programSopi;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
}

const getOneProgramSopi = async (req, res, next) => {
  const { ProgramSopiId } = req.params;
  const { flat } = req.query;
  try {
    const flatten = (flat === 'true') ? true : false;
    const getPSById = await ProgramSopiHelper.getOneProgramSopiByQueryObject({id: ProgramSopiId}, flatten);
    if (getPSById.err) {
      return next(ErrorHelper.clientError(getPSById.err));
    }
    req.data = getPSById.programSopis;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const updateProgramSopi = async (req, res, next) => {
  const { ProgramSopiId } = req.params;
  const { so, code, description } = req.body;
  try {
    const findSo = await SopiHelper.getSoByCode(so);
    let soData;
    if (findSo.err) { return ErrorHelper.clientError(findSo.err, 422); }
    if (findSo.so) {
      soData = findSo.so;
    } else {
      const createSo = await SopiHelper.createSo({code: so});
      if (createSo.err) { return ErrorHelper.clientError(createSo.err, 422); }
      soData = createSo.so;
    }
    const findSopi = await SopiHelper.getOneSopiByQueryObject({code: code});
    let sopiData;
    if (findSopi.err) { return ErrorHelper.clientError(findSopi.err, 422); }
    if (findSopi.sopi) {
      sopiData = findSopi.sopi;
    } else {
      const createSopi = await SopiHelper.createSopi({code: code, SoId: soData.id});
      if (createSopi.err) { return next(ErrorHelper.clientError(createSopi.err)); }
      sopiData = createSopi.sopi;
    }
    const programSopiData = {SopiId: sopiData.id, description: description};
    const updatePS = await ProgramSopiHelper.updateProgramSopi({id: ProgramSopiId}, programSopiData);
    if (updatePS.err) {
      return next(ErrorHelper.clientError(updatePS.err));
    }
    req.data = updatePS.programSopi;
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

const deleteProgramSopi = async (req, res, next) => {
  const { ProgramSopiId } = req.params;
  try {
    const deletePS = await ProgramSopiHelper.deleteProgramSopi(ProgramSopiId);
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
  const { ProgramId } = req.params;
  const { dataArray } = req.body;
  try {
    const bulkCreate = await ProgramSopiHelper.bulkCreateProgramSopi(dataArray, ProgramId);
    req.data = bulkCreate;
    next();
  }
  catch (e) {
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
