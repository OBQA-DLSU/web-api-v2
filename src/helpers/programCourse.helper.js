const Db = require('../../models');
const CourseHelper = require('./course.helper');

function getProgramCourse (flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const programCourses = await Db.ProgramCourse.findAll({
        where: {},
        include: [
          { model: Db.Program },
          { model: Db.Course }
        ],
        raw: flat
      });
      resolve({err: null, programCourses: programCourses});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getProgramCourseByQueryObject (queryObject = {}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const programCourses = await Db.ProgramCourse.findAll({
        where: queryObject,
        include: [
          { model: Db.Program },
          { model: Db.Course }
        ],
        raw: flat
      });
      resolve({err: null, programCourses: programCourses});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getOneProgramCourseByQueryObject (queryObject = {}, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const programCourse = await Db.ProgramCourse.findOne({
        where: queryObject,
        include: [
          { model: Db.Program },
          { model: Db.Course }
        ],
        raw: flat
      });
      resolve({err: null, programCourse: programCourse});
    }
    catch (e) {
      reject(e);
    }
  });
}

function getProgramCourseById (id, flat = false) {
  return new Promise(async(resolve, reject) => {
    try {
      const programCourse = await Db.ProgramCourse.findOne({
        where: {id: id},
        include: [
          { model: Db.Program },
          { model: Db.Course }
        ],
        raw: flat
      });
      resolve({err: null, programCourse: programCourse});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createProgramCourse (programCourseData) {
  return new Promise(async(resolve, reject) => {
    try {
      const programCourse = await Db.ProgramCourse.create(programCourseData);
      if (!programCourse) {
        return resolve({err: 'Invalid Program Course Data'});
      }
      const getPGD = await getProgramCourseById(programCourse.id);
      resolve({err: null, programCourse: getPGD.programCourse});
    }
    catch (e) {
      reject(e);
    }
  });
}

function updateProgramCourse (id, programCourseData) {
  return new Promise(async(resolve, reject) => {
    try {
      const updateProgramCourse = await Db.ProgramCourse.update(programCourseData, {
        where: {id: id}, returning: true, individualHooks: true
      });
      if (!updateProgramCourse[1][0]) {
        return resolve({err: 'Invalid ProgramCourse ID'});
      }
      const getProgramCourse = await getProgramCourseById(updateProgramCourse[1][0].id);
      resolve({err: null, programCourse: getProgramCourse.programCourse});
    }
    catch (e) {
      reject(e);
    }
  });
}

function deleteProgramCourse (id) {
  return new Promise(async(resolve, reject) => {
    try {
      const deleteProgramCourse = await Db.ProgramCourse.destroy({
        where: { id: id}, returning: true, individualHooks: true
      });
      if (deleteProgramCourse === 0) {
        return resolve({err: 'Invalid ProgramCourse ID'});
      }
      resolve({err: null, count: deleteProgramCourse});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createProgramCourseFromInput ({code, ProgramId, description}) {
  return new Promise(async(resolve, reject) => {
    try {
      let courseData, programCourseData;
      const findCourse = await CourseHelper.getCourseByQueryObject({code: code});
      if (findCourse.err) { return resolve({err: findCourse.err}); }
      if (findCourse.course) {
        courseData = findCourse.course;
      } else {
        const createCourse = await CourseHelper.createCourse({code: code});
        if (createCourse.err) { return resolve({err: createCourse.err}); }
        courseData = createCourse.course;
      }
      const findProgramCourse = await getOneProgramCourseByQueryObject({CourseId: courseData.id});
      if (findProgramCourse.err) { return resolve({err: findProgramCourse.err}); }
      if (findProgramCourse.programCourse) {
        programCourseData = findProgramCourse.programCourse;
      } else {
        const createProgramCourse = await createProgramCourse({ProgramId: ProgramId, CourseId: courseData.id, description: description});
        if (createProgramCourse.err) { return resolve({err: createProgramCourse.err }); }
        programCourseData = createProgramCourse.programCourse;
      }
      resolve({err: null, programCourse: programCourseData});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createProgramCourseFromDataArray (dataArray, ProgramId) {
  return new Promise(async(resolve, reject) => {
    try {
      let success = [], error = [];
      const processData = await Promise.all(dataArray.map(async(d) => {
        const data = {code: d.course, ProgramId: ProgramId, description: d.description};
        const createPC = await createProgramCourseFromInput(data);
        if (createPC.err) { return error.push(createPC.err); }
        success.push(createPC.programCourse);
      }));
      resolve({error, success});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getOneProgramCourseByQueryObject: getOneProgramCourseByQueryObject,
  getProgramCourse: getProgramCourse,
  getProgramCourseById: getProgramCourseById,
  getProgramCourseByQueryObject: getProgramCourseByQueryObject,
  createProgramCourse: createProgramCourse,
  updateProgramCourse: updateProgramCourse,
  deleteProgramCourse: deleteProgramCourse,
  createProgramCourseFromInput: createProgramCourseFromInput,
  createProgramCourseFromDataArray: createProgramCourseFromDataArray
};
