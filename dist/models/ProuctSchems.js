"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
const ProductModel = (sequelize) => {
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        originalPrice: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        thumbnailImg: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        overallRating: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0
        },
        Details: {
            type: sequelize_1.DataTypes.JSON
        },
        seller: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'products',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
    });
    return Product;
};
exports.default = ProductModel;
