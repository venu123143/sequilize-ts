import { QueryInterface, DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('booking_seats', {
      booking_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'bookings',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      seat_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    });

    // Add indexes for better performance
    await queryInterface.addIndex('booking_seats', ['booking_id']);
    await queryInterface.addIndex('booking_seats', ['seat_id']);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('booking_seats');
  }
};
