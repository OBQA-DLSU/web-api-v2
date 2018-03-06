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

module.exports = {
  getSoByCode: getSoByCode,
  createSo: createSo
};
