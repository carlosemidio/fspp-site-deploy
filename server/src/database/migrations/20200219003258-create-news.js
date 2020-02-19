'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('news', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      title: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      image: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      created_at: {
          type: Sequelize.DATE,
          allowNull: false,
      },
      updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('news');
  }
};
