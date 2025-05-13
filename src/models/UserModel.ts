import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import db from "@/config/db"

export enum UserStatus {
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    PENDING = 'pending',
    ARCHIVED = 'archived',
    BLOCKED = 'blocked',
    REJECTED = 'rejected',
}
export enum UserRole {
    ADMIN = 'admin',
    DEALER = 'dealer',
    CUSTOM = 'custom',
}
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHERS = 'others',
}

export interface IUserAttributes {
    id?: number;
    email: string;
    gender?: Gender | null,
    password?: string | null;
    status?: UserStatus;
    role: UserRole;
    name?: string;
    phone?: string;
    address_line_one?: string | null;
    address_line_two?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    last_login?: Date;
    created_at?: Date;
    updated_at?: Date;
}

export class User extends Model<IUserAttributes, Optional<IUserAttributes, 'id' | 'password'>> implements IUserAttributes {
    public id!: number;
    public email!: string;
    public password!: string | null;
    public status!: UserStatus;
    public role!: UserRole;
    public name!: string;
    public gender!: Gender;
    public phone!: string;
    public last_login!: Date;
    public address_line_one!: string | null;
    public address_line_two!: string | null;
    public city!: string | null;
    public state!: string | null;
    public zip!: string | null;


    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

const UserModel = (sequelize: Sequelize): typeof User => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(63),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(UserStatus)),
            allowNull: false,
            defaultValue: UserStatus.ACTIVE
        },
        gender: {
            type: DataTypes.ENUM(...Object.values(Gender)),
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(31),
            allowNull: false,
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        address_line_one: {
            type: DataTypes.STRING(127),
            allowNull: true,
        },
        address_line_two: {
            type: DataTypes.STRING(127),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(127),
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING(127),
            allowNull: true,
        },
        zip: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "users",
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
    });
    // User.sync({ alter: true })
    // .then(() => console.log('User tables synced.'))
    // .catch((error: unknown) => console.error('Error syncing database:', error));


    return User;
};

export default UserModel;
