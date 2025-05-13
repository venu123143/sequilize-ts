import { DataTypes, Model, Sequelize } from 'sequelize';
export interface IPermissionDependency {
    permission_id: number;
    dependency_id: number;
}

export class PermissionDependency extends Model<IPermissionDependency> implements IPermissionDependency {
    public permission_id!: number;
    public dependency_id!: number;
}

const PermissionDependencyModel = (sequelize: Sequelize): typeof PermissionDependency => {
    PermissionDependency.init({
        permission_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "permissions",
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        dependency_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "permissions",
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        tableName: 'permissions_dependencies',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['permission_id', 'dependency_id']
            },
        ],
    });
    // PermissionDependency.sync({ alter: true })
    //     .then(() => console.log('PermissionDependency tables synced.'))
    //     .catch((error: unknown) => console.error('Error syncing database:', error));

    return PermissionDependency;
};

export default PermissionDependencyModel;
