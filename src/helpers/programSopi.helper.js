const Db = require('../../models');
const SopiHelper = require('./sopi.helper');

function getProgramSopi (queryObject = {}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const programSopis = await Db.ProgramSopi.findAll({
        where: queryObject,
        include: [ {model: Db.Program}, {model: Db.Sopi, include: [Db.So]} ],
        raw: flat
      });
      resolve({err: null, programSopis: programSopis});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getProgramSopiById (id, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const programSopi = await Db.ProgramSopi.findOne({
        where: {id: id},
        include: [ {model: Db.Program}, {model: Db.Sopi, include: [Db.So]} ],
        raw: flat
      });
      resolve({err: null, programSopi: programSopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getOneProgramSopiByQueryObject (queryObject, flat=false) {
  return new Promise(async(resolve, reject) => {
    try {
      const programSopi = await Db.ProgramSopi.findOne({
        where: queryObject,
        include: [ {model: Db.Program}, {model: Db.Sopi, include: [Db.So]} ],
        raw: flat
      });
      resolve({err: null, programSopi: programSopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createProgramSopi (programSopiData, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const newProgramSopi = await Db.ProgramSopi.create(programSopiData);
      if (!newProgramSopi) {
        return resolve({err: 'Invalid Program Sopi Data'});
      }
      const getPS = await getProgramSopiById(newProgramSopi.id, flat);
      if (getPS.err) { return resolve({err: getPS.err}); }
      resolve({err: null, programSopi: getPS.programSopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function updateProgramSopi (findObject, programSopiData, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      if (!findObject || findObject == {}) {
        return resolve({err: 'Invalid find Object'});
      }
      const updateProgramSopi = await Db.ProgramSopi.update(programSopiData, {
        where: findObject, individualHooks: true, returning: true
      });
      if (updateProgramSopi[1].length === 0) {
        return resolve({err: 'Invalid ProgramSopi Data or findObject'});
      }
      if (updateProgramSopi[1].length === 1) {
        const getPS = await getProgramSopiById(updateProgramSopi[1][0].id, flat);
        return resolve({err: null, programSopi: getPS.programSopi});
      }
      const programSopis = await Promise.all(updateProgramSopi[1].map(async(d) => {
        const getPS = await getProgramSopiById(d.id, flat);
        return getPS.programSopi;
      }));
      resolve({err: null, programSopis: programSopis});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createProgramSopiFromInput ({ProgramId, So, code, description}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      let soData, sopiData, programSopiData;
      const findSo = await SopiHelper.getSoByCode(So);
      if (findSo.err) { return resolve({err: findSo.err}); }
      if (!findSo.so) {
        const createSo = await SopiHelper.createSo({code: So});
        if (createSo.err) { return resolve({err: createSo.err}); }
        soData = createSo.so;
      } else {
        soData = findSo.so;
      }
      const findSopi = await SopiHelper.getOneSopiByQueryObject({code: code});
      if (findSopi.err) { return resolve({err: findSopi.err}); }
      if (findSopi.sopi) {
        sopiData = findSopi.sopi;
      } else {
        const createSopi = await SopiHelper.createSopi({code: code, SoId: soData.id});
        if (createSopi.err) { return resolve({err: createSopi.err}) }
        sopiData = createSopi.sopi;
      }
      const findPS = await getOneProgramSopiByQueryObject({ProgramId: ProgramId, SopiId: sopiData.id}, flat);
      if (findPS.err) { return resolve({err: findPS.err}) }
      if (!findPS.programSopi) {
        if (!sopiData.id) {
          return resolve({err: 'no sopi ID'});
        }
        const createPS = await createProgramSopi({ProgramId: ProgramId, SopiId: sopiData.id, description}, flat);
        if (createPS.err) { return resolve({err: createPS.err}); }
        programSopiData = createPS.programSopi;
      } else {
        programSopiData = findPS.programSopi;
      }
      if (!programSopiData) { return resolve({err: 'Invalid Inputs'}); }
      resolve({err: null, programSopi: programSopiData});
    }
    catch (e) {
      reject(e);
    }
  });
}

function updateProgramSopiFromInput (id, {So, code, description}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const findSo = await SopiHelper.getSoByCode(So);
      let soData;
      if (findSo.err) { return resolve({err: findSo.err}); }
      if (findSo.so) {
        soData = findSo.so;
      } else {
        const createSo = await SopiHelper.createSo({code: So});
        if (createSo.err) { return resolve({err: createSo.err}); }
        soData = createSo.so;
      }
      const findSopi = await SopiHelper.getOneSopiByQueryObject({code: code, SoId: soData.id});
      let sopiData;
      if (findSopi.err) { return resolve({err: findSopi.err}); }
      if (findSopi.sopi) {
        sopiData = findSopi.sopi;
      } else {
        const createSopi = await SopiHelper.createSopi({code: code, SoId: soData.id});
        if (createSopi.err) { return resolve({err: createSopi.err}); }
        sopiData = createSopi.sopi;
      }
      const programSopiData = {SopiId: sopiData.id, description: description};
      const updatePS = await updateProgramSopi({id: id}, programSopiData, flat);
      if (updatePS.err) { return resolve({err: updatePS.err}); }
      if (!updatePS.programSopi) { return resolve({err: 'Invalid Inputs'}); }
      resolve({err: null, programSopi: updatePS.programSopi});
    }
    catch (e) {
      next(ErrorHelper.serverError(e));
    }
  })
}

function deleteProgramSopi (id) {
  return new Promise(async(resolve, reject) => {
    try {
      const programSopiCount = await Db.ProgramSopi.destroy({ where: {id} });
      if (programSopiCount === 0) {
        return resolve({err: 'Invalid ProgramSopi ID'});
      }
      resolve({err: null, count: programSopiCount});
    }
    catch (e) {
      reject(e);
    }
  });
}

function bulkCreateProgramSopi (dataArray, ProgramId, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      let success = [], error = [];
      const processData = await Promise.all(dataArray.map(async(d) => {
        const { So, code, description } = d;
        const createPS = await createProgramSopiFromInput({ProgramId, So, code, description}, flat);
        if (createPS.err) { error.push(createPS.err); }
        if (!createPS.programSopi) { error.push('Invalid input'); }
        success.push(createPS.programSopi);
      }));
      resolve({success: success, error: error});
    }
    catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

module.exports = {
  createProgramSopi: createProgramSopi,
  getProgramSopi: getProgramSopi,
  getProgramSopiById: getProgramSopiById,
  updateProgramSopi: updateProgramSopi,
  deleteProgramSopi: deleteProgramSopi,
  getOneProgramSopiByQueryObject: getOneProgramSopiByQueryObject,
  bulkCreateProgramSopi: bulkCreateProgramSopi,
  createProgramSopiFromInput: createProgramSopiFromInput,
  updateProgramSopiFromInput: updateProgramSopiFromInput
};
