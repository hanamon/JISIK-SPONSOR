'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128)
      },
      mobile: {
        unique: true,
        type: Sequelize.STRING(64)
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      bio: {
        type: Sequelize.STRING(255)
      },
      profile_url: {
        type: Sequelize.STRING(255)
      },
      role_id: {
        allowNull: false,
        defaultValue: 2,
        type: Sequelize.INTEGER,
        references: { model: 'user_roles', key: 'id' }
      },
      signup_method: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      email_verified: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      key_for_verify: {
        type: Sequelize.STRING(255)
      },
      projects_supported: {
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.DECIMAL(12, 2)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};