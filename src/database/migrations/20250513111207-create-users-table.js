'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(63),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'suspended', 'pending', 'archived', 'blocked', 'rejected'),
        allowNull: false,
        defaultValue: 'active'
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'others'),
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('admin', 'dealer', 'custom'),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(31),
        allowNull: false,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      address_line_one: {
        type: Sequelize.STRING(127),
        allowNull: true,
      },
      address_line_two: {
        type: Sequelize.STRING(127),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(127),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(127),
        allowNull: true,
      },
      zip: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};