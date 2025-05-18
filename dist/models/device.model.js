"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const sequelize_1 = require("sequelize");
class Device extends sequelize_1.Model {
    static associate(models) {
    }
}
exports.Device = Device;
const DeviceModel = (sequelize) => {
    Device.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        authToken: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        browser: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'devices',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
    });
    return Device;
};
exports.default = DeviceModel;
