'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoincrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recipients');
  }
};
