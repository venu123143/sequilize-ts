import { Sequelize } from "sequelize";
import initUserModel from "@/models/user.model";
import initDeviceModel from "@/models/device.model";
import initProductModel from "@/models/product.model";
import initRole from "@/models/role.model";
import initPermissions from "@/models/permissions.model";
import initRoleHasPermission from "@/models/roleHasPermission.model";
import initPermissionDependencies from "@/models/permissionDependencies.model";

// migration commands
// npx sequelize-cli init
// npx sequelize-cli db:migrate:undo:all
// npx sequelize-cli migration:generate --name create-users-table
// # Wait a few seconds to ensure a different timestamp
// npx sequelize-cli migration:generate --name create-devices-table
// # Wait a few seconds
// npx sequelize-cli migration:generate --name create-products-table
// # Wait a few seconds
// npx sequelize-cli migration:generate --name add-indexes
// npx sequelize-cli migration:generate --name create-users-table
// npx sequelize-cli db:migrate
// If you want to undo the last migration, you can use:
// npx sequelize-cli db:migrate:undo
// If you want to undo all migrations, you can use:
// npx sequelize-cli db:migrate:undo:all
// Initialize the Sequelize connection
// npx sequelize-cli seed:generate --name demo-users
// npx sequelize-cli seed:generate --name demo-products
// npx sequelize-cli seed:generate --name demo-devices
// npx sequelize-cli db:seed:all
// npx sequelize-cli db:seed:undo
// npx sequelize-cli db:seed:undo:all
const connection = new Sequelize(
    process.env.DB_DATABASE as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
        pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    }
);

// Test the database connection
connection
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error: Error) => {
        connection?.close();
        console.error("Unable to connect to the database:", error);
    });

// Initialize models
const db = {
    Sequelize,
    connection,
    User: initUserModel(connection),
    Device: initDeviceModel(connection),
    Product: initProductModel(connection),
    Role: initRole(connection),
    Permissions: initPermissions(connection),
    RoleHasPermission: initRoleHasPermission(connection),
    PermissionDependencies: initPermissionDependencies(connection),
};

// Define associations
db.User.hasMany(db.Product, { foreignKey: "seller", as: "products" });
db.User.hasMany(db.Device, { foreignKey: "user_id", as: "devices" });
db.Device.belongsTo(db.User, { foreignKey: "user_id", as: "user" });
db.Product.belongsTo(db.User, { foreignKey: "seller", as: "sellerDetails" });

// Optional: Sync models with database
// connection.sync({ alter: true })
//     .then(() => console.log('Database tables synced.'))
//     .catch((error: unknown) => console.error('Error syncing database:', error));

export default db;
