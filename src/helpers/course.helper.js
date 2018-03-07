const Db = require('../../models');

function getCourse (flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const courses = await Db.Course.findAll({
        where: {},
        raw: flat
      });
      resolve({err: null, course: courses});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getOneCourseByQueryObject (queryObject = {}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const course = await Db.Course.findOne({
        where: queryObject,
        raw: flat
      });
      resolve({err: null, course: course});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getCourseById (id, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const course = await Db.Course.findOne({
        where: { id: id },
        raw: flat
      });
      resolve({err: null, course: course});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getCourseByQueryObject (queryObject = {}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const courses = await Db.Course.findAll({
        where: queryObject,
        raw: flat
      });
      resolve({err: null, course: courses});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createCourse (courseData) {
  return new Promise(async(resolve, reject) => {
    try {
      const course = await Db.Course.create(courseData);
      if (!course) {
        return resolve({err: 'Invalid course Data'});
      }
      const courseData = await getCourseById(course.id);
      resolve({err: null, course: courseData.course});
    }
    catch (e) {
      reject(e);
    }
  });
}

function updateCourse (id, courseData) {
  return new Promise(async(resolve, reject) => {
    try {
      const updateCourse = await Db.Course.update({
        where: {id: id}, returning: true, individualHooks: true
      });
      if (!updateCourse[1][0]) {
        return resolve({err: 'Invalid Course Id'});
      }
      const coursData = await getCourseById(updateCourse[1][0].id);
      resolve({err: null, course: courseData.course});
    }
    catch (e) {
      reject(e);
    }
  });
}

function deleteCourse (id) {
  return new Promise(async(resolve, reject) => {
    try {
      const deleteCourse = await Db.Course.destroy({
        where: { id: id }, individualHooks: true, returning: true
      });
      if (deleteCourse === 0) {
        return resolve({err: 'Invalid Course ID'});
      }
      resolve({err: null, count: deleteCourse});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getCourse: getCourse,
  getOneCourseByQueryObject: getOneCourseByQueryObject,
  getCourseById: getCourseById,
  getCourseByQueryObject: getCourseByQueryObject,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse
};