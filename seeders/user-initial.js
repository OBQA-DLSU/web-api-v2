'use strict';
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        idNumber: '7777777',
        email: 'john.higgins.avila@dlsu.edu.ph',
        fname: 'John',
        lname: 'Avila',
        RoleId: 1,
        password: bcrypt.hashSync('admin', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idNumber: '7777770',
        email: 'johnhiggins.avila@gmail.com',
        fname: 'John',
        lname: 'Avila',
        RoleId: 2,
        password: bcrypt.hashSync('test', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
