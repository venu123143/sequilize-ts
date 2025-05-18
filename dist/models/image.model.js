"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const sequelize_1 = require("sequelize");
class Image extends sequelize_1.Model {
}
exports.Image = Image;
const ImageModel = (sequelize) => {
    Image.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        prod_id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
    }, {
        sequelize,
        tableName: "images",
        freezeTableName: true,
        timestamps: true,
    });
    return Image;
};
exports.default = ImageModel;
