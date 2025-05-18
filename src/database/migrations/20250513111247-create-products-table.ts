import { QueryInterface, DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT, // Changed from STRING to TEXT for longer descriptions
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      original_price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      thumbnail_img: {
        type: DataTypes.STRING,
        allowNull: false
      },
      overall_rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      details: {
        type: DataTypes.JSON
      },
      seller: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Add indexes for better performance
    await queryInterface.addIndex('products', ['seller']);
    await queryInterface.addIndex('products', ['slug'], { unique: true });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('products');
  }
}; 