"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Gender = exports.UserRole = exports.UserStatus = void 0;
const sequelize_1 = require("sequelize");
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["SUSPENDED"] = "suspended";
    UserStatus["PENDING"] = "pending";
    UserStatus["ARCHIVED"] = "archived";
    UserStatus["BLOCKED"] = "blocked";
    UserStatus["REJECTED"] = "rejected";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["DEALER"] = "dealer";
    UserRole["CUSTOM"] = "custom";
})(UserRole || (exports.UserRole = UserRole = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHERS"] = "others";
})(Gender || (exports.Gender = Gender = {}));
class User extends sequelize_1.Model {
}
exports.User = User;
const UserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(63),
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(UserStatus)),
            allowNull: false,
            defaultValue: UserStatus.ACTIVE
        },
        gender: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(Gender)),
            allowNull: true,
        },
        role: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING(31),
            allowNull: false,
        },
        last_login: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        address_line_one: {
            type: sequelize_1.DataTypes.STRING(127),
            allowNull: true,
        },
        address_line_two: {
            type: sequelize_1.DataTypes.STRING(127),
            allowNull: true,
        },
        city: {
            type: sequelize_1.DataTypes.STRING(127),
            allowNull: true,
        },
        state: {
            type: sequelize_1.DataTypes.STRING(127),
            allowNull: true,
        },
        zip: {
            type: sequelize_1.DataTypes.STRING(15),
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
    return User;
};
exports.default = UserModel;
