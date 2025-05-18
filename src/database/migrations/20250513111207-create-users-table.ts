import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(63),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'suspended', 'pending', 'archived', 'blocked', 'rejected'),
        allowNull: false,
        defaultValue: 'active'
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'others'),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('admin', 'dealer', 'custom'),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(31),
        allowNull: false,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      address_line_one: {
        type: DataTypes.STRING(127),
        allowNull: true,
      },
      address_line_two: {
        type: DataTypes.STRING(127),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(127),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(127),
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('users');
  }
}; 