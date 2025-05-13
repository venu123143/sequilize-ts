import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface IPermissions {
    id?: number;
    action: string;
    group?: string | null;
    created_at?: Date;
    updated_at?: Date;
}

export class Permission extends Model<IPermissions, Optional<IPermissions, 'id'>> implements IPermissions {
    public id!: number;
    public action!: string;
    public group?: string | null;

    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

const PermissionModel = (sequelize: Sequelize): typeof Permission => {
    Permission.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        group: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'permissions',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                unique: true, // Enforce unique constraint
                fields: ['action'], // Composite unique index on name and action
            },
        ],
    });
    // Permission.sync({ alter: true }).then(() => {
    //   console.log("Permission sync");
    // }).catch((err) => {
    //   console.log(err);
    // })
    return Permission;
};

export default PermissionModel;
