import { Model, Optional, Sequelize } from "sequelize";
import User from "./UserModel";

interface DeviceAttributes {
    id: number;
    name: string;
    type: string;
    authToken: string;
    browser: string;
    user_id: number;
}

interface DeviceCreationAttributes extends Optional<DeviceAttributes, 'id'> { }

export interface DeviceModel extends Model<DeviceAttributes, DeviceCreationAttributes>, DeviceAttributes { }

const DeviceModel = (sequelize: Sequelize, DataTypes: any) => {
    const Device = sequelize.define<DeviceModel>('devices', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        browser: {
            type: DataTypes.STRING,
        },
        authToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    }, { timestamps: true, freezeTableName: true });
    return Device;
};

export default DeviceModel;
