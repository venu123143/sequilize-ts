import { DataTypes, Model, Optional, Sequelize } from 'sequelize';


export interface IRole {
    id: number;
    name: string;
    description?: string | null;
    status?: RoleStatusType;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}
export enum RoleStatusType {
    Active = "active",
    Inactive = "inactive",
    Archived = "archived",
    Blocked = "blocked",
    Deleted = "deleted"
}


export class Role extends Model<IRole, Optional<IRole, 'id' | 'description'>> implements IRole {
    public id!: number;
    public name!: string;
    public description!: string | null;
    public status!: RoleStatusType;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at!: Date | null;
}

const RoleModel = (sequelize: Sequelize): typeof Role => {
    Role.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(63),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(RoleStatusType)),
            allowNull: false,
            defaultValue: RoleStatusType.Active
        },
    }, {
        sequelize,
        tableName: 'roles',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                unique: true,
                fields: ['name'], // Composite unique index
                // This will enforce that each role name is unique 
            },
        ],
    });

    // Role.sync({ alter: true })
    //     .then(() => console.log('Role tables synced.'))
    //     .catch((error: unknown) => console.error('Error syncing database:', error));

    return Role;
};

export default RoleModel;
