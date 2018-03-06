const Db = require('../../models');

function getSoByCode (code) {
  return new Promise(async(resolve, reject) => {
    try {
      so = await Db.So.findOne({where: { code: code }});
      if (!so) {
        return resolve({err: 'Invalid SO Code'});
      }
      resolve({err: null, so: so});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createSo (soData) {
  return new Promise(async(resolve, reject) => {
    try {
      so = await Db.So.create(soData);
      if (!so) {
        return resolve({err: 'Invalid So Data'});
      }
      resolve({err: null, so: so});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createSopi (sopiData) {
  return new Promise(async(resolve, reject) => {
    try {
      const newSopi = await Db.Sopi.create(sopiData);
      if (!newSopi) {
        return resolve({err: 'Invalid Sopi Data'});
      }
      resolve({err: null, sopi: newSopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getSopi (queryObject = {}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const sopis = await Db.Sopi.findAll({
        where: queryObject,
        include: [{ model: Db.So }],
        raw: flat
      });
      resolve({err: null, sopis: sopis});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getSopiById (SopiId, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const sopi = await Db.Sopi.findOne({
        where: { id: SopiId },
        include: [{ model: Db.So }],
        raw: flat
      });
      resolve({err: null, sopi: sopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getSopiByQueryObject (queryObject, flat=false) {
  return new Promise(async(resolve, reject) => {
    try {

    }
    catch (e) {
      reject(e);
    }
  });
}

function getOneSopiByQueryObject (queryObject, flat=false) {
  return new Promise(async(resolve, reject) => {
    try {
      const sopi = await Db.Sopi.findOne({
        where: queryObject,
        include: [{ model: Db.So }],
        raw: flat
      });
      resolve({err: null, sopi: sopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function updateSopi (SopiId, sopiData) {
  return new Promise(async(resolve, reject) => {
    try {
      const updatedSopi = await Db.Sopi.update(sopiData, {
        where: { id: SopiId }, individualHooks: true, returning: true
      });
      if (!updateSopi[1][0]) {
        return resolve({err: 'Invalid Sopi ID'});
      }
      const getS = await getSopiById(updateSopi[1][0].id);
      resolve({err: null, sopi: getS.sopi});
    }
    catch (e) {
      reject(e);
    }
  });
}

function deleteSopi (SopiId) {
  return new Promise(async(resolve, reject) => {
    try {

    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  createSo: createSo,
  getSoByCode: getSoByCode,
  getSopi: getSopi,
  getSopiById: getSopiById,
  // getSopiByQueryObject: getSopiByQueryObject,
  createSopi: createSopi,
  updateSopi: updateSopi,
  getOneSopiByQueryObject: getOneSopiByQueryObject
  // deleteSopi: deleteSopi
};