import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface DeviceAttributes {
    id?: number;
    name: string;
    type: string;
    authToken?: string;
    browser: string;
    user_id: number;
}

export class Device extends Model<DeviceAttributes, Optional<DeviceAttributes, 'id' | 'authToken'>> implements DeviceAttributes {
    public id!: number;
    public name!: string;
    public type!: string;
    public authToken!: string;
    public browser!: string;
    public user_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const DeviceModel = (sequelize: Sequelize): typeof Device => {
    Device.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        browser: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
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

export default DeviceModel;
