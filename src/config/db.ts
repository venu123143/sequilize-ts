import { Sequelize, DataTypes } from "sequelize";
import initUserModel from "@/models/UserModel";
import initDeviceModel from "@/models/DeviceModel";
import initProductModel from "@/models/ProuctSchems";

// Initialize the Sequelize connection
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
