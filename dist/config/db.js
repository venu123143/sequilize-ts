"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("@/models/user.model"));
const image_model_1 = __importDefault(require("@/models/image.model"));
const device_model_1 = __importDefault(require("@/models/device.model"));
const product_model_1 = __importDefault(require("@/models/product.model"));
const role_model_1 = __importDefault(require("@/models/role.model"));
const permissions_model_1 = __importDefault(require("@/models/permissions.model"));
const roleHasPermission_model_1 = __importDefault(require("@/models/roleHasPermission.model"));
const permissionDependencies_model_1 = __importDefault(require("@/models/permissionDependencies.model"));
const bookingSeats_model_1 = __importDefault(require("@/models/bookingSeats.model"));
const bookings_model_1 = __importDefault(require("@/models/bookings.model"));
const connection = new sequelize_1.Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    port: parseInt(process.env.DB_PORT, 10),
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
    User: (0, user_model_1.default)(connection),
    Image: (0, image_model_1.default)(connection),
    Device: (0, device_model_1.default)(connection),
    Product: (0, product_model_1.default)(connection),
    Role: (0, role_model_1.default)(connection),
    Permissions: (0, permissions_model_1.default)(connection),
    RoleHasPermission: (0, roleHasPermission_model_1.default)(connection),
    PermissionDependencies: (0, permissionDependencies_model_1.default)(connection),
    BookingSeats: (0, bookingSeats_model_1.default)(connection),
    Bookings: (0, bookings_model_1.default)(connection),
};
db.User.hasMany(db.Product, { foreignKey: "seller", as: "products" });
db.User.hasMany(db.Device, { foreignKey: "user_id", as: "devices" });
db.Device.belongsTo(db.User, { foreignKey: "user_id", as: "user" });
db.Product.belongsTo(db.User, { foreignKey: "seller", as: "sellerDetails" });
exports.default = db;
