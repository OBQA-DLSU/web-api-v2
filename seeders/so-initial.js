'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Sos', [
     {
        code: 'A',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        code: 'B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'F',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'G',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'H',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'I',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'J',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'K',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'L',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'M',
        createdAt: new Date(),
        updatedAt: new Date()
      }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('So', null, {});
  }
};
