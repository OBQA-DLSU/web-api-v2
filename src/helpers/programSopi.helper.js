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

function createProgramSopi (programSopiData) {
  return new Promise(async(resolve, reject) => {
    try {
      const newProgramSopi = await Db.ProgramSopi.create(programSopiData);
      if (!newProgramSopi) {
        return resolve({err: 'Invalid Program Sopi Data'});
      }
      const getPS = await getProgramSopiById(newProgramSopi.id);
      resolve({err: null, programSopi: getPS.programSopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function updateProgramSopi (findObject, programSopiData) {
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
        const getPS = await getProgramSopiById(updateProgramSopi[1][0].id);
        resolve({err: null, programSopi: getPS.programSopi});
      }
      const programSopis = await Promise.all(updateProgramSopi[1].map(async(d) => {
        const getPS = await getProgramSopiById(d.id);
        return getPS.programSopi;
      }));
      resolve({err: null, programSopis: programSopis});
    }
    catch (e) {
      reject(e);
    }
  });
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

function bulkCreateProgramSopi (dataArray, ProgramId) {
  return new Promise(async(resolve, reject) => {
    try {
      let success = [], error = [];
      const processData = await Promise.all(dataArray.map(async(d) => {
        const { so, code, description } = d;
        let soData, sopiData, programSopiData;
        const findSo = await SopiHelper.getSoByCode(so);
        if (findSo.err) { return error.push(findSo.err); }
        if (findSo.so) {
          soData = findSo.so;
        } else {
          createSo = await SopiHelper.createSo({code: so});
          if (createSo.err) { return error.push(createSo.err); }
          soData = createSo.so;
        }
        const findSopi = await SopiHelper.getOneSopiByQueryObject({code: code});
        if (findSopi.err) { return error.push(findSopi.err); }
        if (findSopi.sopi) {
          sopiData = findSopi.sopi;
        } else {
          createSopi = await SopiHelper.createSopi({code: code, SoId: soData.id});
          if (createSopi.err) { return error.push(createSopi.err); }
          sopiData = createSopi.sopi;
        }
        const findProgramSopi = await getOneProgramSopiByQueryObject({SopiId: sopiData.id, ProgramId: ProgramId});
        if (findProgramSopi.err) { return error.push(findProgramSopi.err); }
        if (findProgramSopi.programSopi) {
          programSopiData = findProgramSopi.programSopi;
        } else {
          const createProgramSopi = await createProgramSopi({SopiId: sopiData.id, ProgramId: ProgramId, description: description});
          if (createProgramSopi.err) { return error.push(createProgramSopi.err); }
          programSopiData = findProgramSopi.programSopi;
        }
        success.push(programSopiData);
      }));
      resolve({success: success, error: error});
    }
    catch (e) {
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
  bulkCreateProgramSopi: bulkCreateProgramSopi  
};
