import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('bookings_analytics', {
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      booking_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'bookings',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      event_id: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      seats: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    });

    // Add indexes for better performance
    await queryInterface.addIndex('bookings_analytics', ['timestamp']);
    await queryInterface.addIndex('bookings_analytics', ['user_id']);
    await queryInterface.addIndex('bookings_analytics', ['booking_id']);
    await queryInterface.addIndex('bookings_analytics', ['event_id']);
    await queryInterface.addIndex('bookings_analytics', ['status']);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('bookings_analytics');
  }
}; 