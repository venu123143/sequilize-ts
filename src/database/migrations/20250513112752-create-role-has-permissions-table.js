'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles_has_permissions', {
      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
      permission_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'permissions',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles_has_permissions');
  }
};