import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Add additional constraints and indexes that might be needed after
    // all tables are created

    // For example, you could add a composite index for product title and seller
    await queryInterface.addIndex('products', ['title', 'seller']);
    
    // Add an index for user status and role for faster filtering
    await queryInterface.addIndex('users', ['status', 'role']);
    
    // Add index for last_login to optimize queries that filter by login time
    await queryInterface.addIndex('users', ['last_login']);
    
    // Add index for device types for faster queries
    await queryInterface.addIndex('devices', ['type']);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    // Remove the added indexes
    await queryInterface.removeIndex('products', ['title', 'seller']);
    await queryInterface.removeIndex('users', ['status', 'role']);
    await queryInterface.removeIndex('users', ['last_login']);
    await queryInterface.removeIndex('devices', ['type']);
  }
}; 