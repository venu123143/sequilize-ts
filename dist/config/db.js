"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const UserModel_1 = __importDefault(require("@/models/UserModel"));
const DeviceModel_1 = __importDefault(require("@/models/DeviceModel"));
const ProuctSchems_1 = __importDefault(require("@/models/ProuctSchems"));
const connection = new sequelize_1.Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
});
connection
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((error) => {
    connection === null || connection === void 0 ? void 0 : connection.close();
    console.error("Unable to connect to the database:", error);
});
const db = {
    Sequelize: sequelize_1.Sequelize,
    connection,
    User: (0, UserModel_1.default)(connection),
    Device: (0, DeviceModel_1.default)(connection),
    Product: (0, ProuctSchems_1.default)(connection),
};
db.User.hasMany(db.Product, { foreignKey: "seller", as: "products" });
db.User.hasMany(db.Device, { foreignKey: "user_id", as: "devices" });
db.Device.belongsTo(db.User, { foreignKey: "user_id", as: "user" });
db.Product.belongsTo(db.User, { foreignKey: "seller", as: "sellerDetails" });
exports.default = db;
