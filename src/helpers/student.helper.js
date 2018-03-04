const Db = require('../../models');

function createStudent (studentData) {
  return new Promise(async(resolve, reject) => {
    try {
      const newStudent = await Db.Student.create(studentData);
      if (!newStudent) {
        return resolve({err: 'Invalid Student Data'});
      }
      resolve({err: null, student: newStudent});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  createStudent: createStudent
};