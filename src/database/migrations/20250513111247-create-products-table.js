'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT, // Changed from STRING to TEXT for longer descriptions
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      original_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      thumbnail_img: {
        type: Sequelize.STRING,
        allowNull: false
      },
      overall_rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      details: {
        type: Sequelize.JSON
      },
      seller: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Add indexes for better performance
    await queryInterface.addIndex('products', ['seller']);
    await queryInterface.addIndex('products', ['slug'], { unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT, // Changed from STRING to TEXT for longer descriptions
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      original_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      thumbnail_img: {
        type: Sequelize.STRING,
        allowNull: false
      },
      overall_rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      details: {
        type: Sequelize.JSON
      },
      seller: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Add indexes for better performance
    await queryInterface.addIndex('products', ['seller']);
    await queryInterface.addIndex('products', ['slug'], { unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};