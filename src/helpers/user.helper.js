const Db = require('../../models');

function getUserById (id, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const user = await Db.User.findOne({
        where: { id: id },
        attributes:['id', 'idNumber', 'email', 'lname', 'fname'],
        include: [
          {model: Db.Role },
          {model: Db.Instructor, include: [{ model: Db.Program }]},
          {model: Db.Student}
        ],
        raw: flat
      });
      resolve({err: null, user: user});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getUserById: getUserById
};