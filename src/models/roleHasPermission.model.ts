import { DataTypes, Model, Sequelize } from 'sequelize';

export interface IRoleHasPermission {
    role_id: number;
    permission_id: number
}
// Define the join model (roles_has_permissions)
export class RoleHasPermission extends Model<IRoleHasPermission> implements IRoleHasPermission {
    public role_id!: number;
    public permission_id!: number;
}

const RoleHasPermissionModel = (sequelize: Sequelize): typeof RoleHasPermission => {
    RoleHasPermission.init({
        role_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "roles",
                key: 'id',
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            primaryKey: true, // Part of the composite primary key
        },
        permission_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "permissions",
                key: 'id',
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            primaryKey: true, // Part of the composite primary key
        },
    }, {
        sequelize,
        tableName: 'roles_has_permissions',
        freezeTableName: true,
        timestamps: false,
    });
    // RoleHasPermission.sync({ alter: true })
    //     .then(() => console.log('RoleHasPermission tables synced.'))
    //     .catch((error: unknown) => console.error('Error syncing database:', error));
    return RoleHasPermission;
};

export default RoleHasPermissionModel;
