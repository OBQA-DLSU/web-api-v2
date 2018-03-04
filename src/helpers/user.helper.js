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
          {model: Db.Student, include: [{ model: Db.Program }]}
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

function getOneUserByQueryObject (queryObject, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const user = await Db.User.findAll({
        where: queryObject,
        attributes:['id', 'idNumber', 'email', 'lname', 'fname'],
        include: [
          {model: Db.Role },
          {model: Db.Instructor, include: [{ model: Db.Program }]},
          {model: Db.Student, include: [{ model: Db.Program }]}
        ],
        raw: flat
      });
      resolve({err: null, user: user[0]});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getUserByQueryObject (queryObject, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const users = await Db.User.findAll({
        where: queryObject,
        attributes:['id', 'idNumber', 'email', 'lname', 'fname', 'RoleId'],
        include: [
          {model: Db.Role },
          {model: Db.Instructor, include: [{ model: Db.Program }]},
          {model: Db.Student, include: [{ model: Db.Program }]}
        ],
        raw: flat
      });
      resolve({err: null, users: users});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getUserById (id, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const user = await Db.User.findOne({
        where: {id: id},
        attributes:['id', 'idNumber', 'email', 'lname', 'fname', 'RoleId'],
        include: [
          {model: Db.Role },
          {model: Db.Instructor, include: [{ model: Db.Program }]},
          {model: Db.Student, include: [{ model: Db.Program }]}
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

function getUsers (flat = true) {
  return new Promise(async(resolve, reject) => {
    try {
      const users = await Db.User.findAll({
        where: {},
        attributes:['id', 'idNumber', 'email', 'lname', 'fname', 'RoleId'],
        include: [
          {model: Db.Role },
          {model: Db.Instructor, include: [{ model: Db.Program }]},
          {model: Db.Student, include: [{ model: Db.Program }]}
        ],
        raw: flat
      });
      resolve({err: null, users: users});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createUser (userData) {
  return new Promise(async(resolve, reject) => {
    try {
      const newUser = await Db.User.create(userData);
      if (!newUser) {
        return resolve({err: 'Invalid User credentitals'});
      }
      resolve({err: null, user: newUser});
    }
    catch (e) {
      reject(e);
    }
  });
}

function updateUser (findObject, userData) {
  return new Promise(async(resolve, reject) => {
    try {
      const updateUser = await Db.User.update({...userData}, {
        where: findObject, individualHooks: true, returning: true
      });
      if (updateUser[1].length === 0) {
        return resolve({err: 'Nothing was updated. invalid findObject or userData'});
      }
      if (updateUser[1].length === 1) {
        return resolve({err: null, user: updateUser[1][0]});
      }
      resolve({err: null, users: updateUser[1]});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getUserById: getUserById,
  getOneUserByQueryObject: getOneUserByQueryObject,
  getUserById: getUserById,
  getUserByQueryObject: getUserByQueryObject,
  getUsers: getUsers,
  createUser: createUser,
  updateUser: updateUser
};
