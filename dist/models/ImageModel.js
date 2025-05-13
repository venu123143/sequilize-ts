"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageModel = (sequelize, DataTypes) => {
    const Image = sequelize.define('images', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prod_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        }
    });
    return Image;
};
exports.default = ImageModel;
