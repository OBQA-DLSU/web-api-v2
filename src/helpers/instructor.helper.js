const Db = require('../../models');

function createInstructor (instructorData) {
  return new Promise(async(resolve, reject) => {
    try {
      const newInstructor = await Db.Instructor.create(instructorData);
      if (!newInstructor) {
        return resolve({err: 'Invalid Instructor Data'});
      }
      resolve({err: null, instructor: newInstructor});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  createInstructor: createInstructor
};
