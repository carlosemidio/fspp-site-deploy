'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', 
    [
      {
        name: 'Teste1',
        email: 'test1@email.com',
        password: 'secret',
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
