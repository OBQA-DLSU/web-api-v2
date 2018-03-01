'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Programs', [
      {
        code: 'CHE',
        name: 'Chemical Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'CE',
        name: 'Civil Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'CPE',
        name: 'Computer Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'ECE',
        name: 'Electronics and Communication Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'IE',
        name: 'Industrial Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'MEM',
        name: 'Manufacturing Engineering and Management',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'ME',
        name: 'Mechanical Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Program', null, {});
  }
};
