
// Declare the Schema of the Mongo model

import { Model, Optional, Sequelize } from "sequelize"
import bcrypt from "bcrypt";

interface UserAttributes {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    profile?: string;
    provider?: string;
    role?: string;
    mobile?: string;
    isBlocked?: boolean;
    forgotPassword?: string;
    otp?: string;
    resetLink?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    generateAuthToken?: () => Promise<string>;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }
export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    generateAuthToken: () => Promise<string>;
}
const UserModel = (sequelize: Sequelize, DataTypes: any) => {
    const User = sequelize.define<UserModel>('users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "",
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "",
            },
            profile: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "",
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "",
            },
            provider: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "emailRegistration",
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: 'user'
            },
            mobile: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            isBlocked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            resetLink: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ''
            }
        }, { timestamps: true, freezeTableName: true })

    User.beforeCreate(async (user) => {
        if (user.password) {
            const saltRounds = 12;
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
    });
    User.prototype.generateAuthToken = async function () {
        const authToken = 'your_generated_token_here';
        this.setDataValue('generateAuthToken', authToken);
        await this.save();

        return authToken;

    }
    // User.beforeSave(async (user) => {
    //     console.log("save");

    //     if (user.password) {
    //         const saltRounds = 12;
    //         user.password = await bcrypt.hash(user.password, saltRounds);
    //     }
    // })
    return User
}

export default UserModel