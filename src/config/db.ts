import { DataTypes, ModelCtor, Sequelize } from "sequelize"
import User, { UserModel } from "../models/UserModel"
import Devise, { DeviceModel } from "../models/DeviceModel"
import Order, { OrderModel } from "../models/OrdersSchema"
import Product, { ProductModel } from "../models/ProuctSchems"
import Images, { ImageModel } from "../models/ImageModel"
// this is the interface for the connected model object.
interface Connection {
    Sequelize: typeof Sequelize;
    sequelize: Sequelize;
    user: ModelCtor<UserModel>;
    device: ModelCtor<DeviceModel>;
    order: ModelCtor<OrderModel>;
    product: ModelCtor<ProductModel>;
    images: ModelCtor<ImageModel>;
    // product: ModelCtor<ProductModel>;
    // review: ModelCtor<ReviewModel>;
}

export const connection = new Sequelize(
    process.env.DB_DATABASE as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });
(async () => {
    try {
        await connection.authenticate();
        console.log('Connection successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

// conn, models maintained here.

const db: Connection = {
    Sequelize,
    sequelize: connection,
    user: User(connection, DataTypes),
    device: Devise(connection, DataTypes),
    order: Order(connection, DataTypes),
    product: Product(connection, DataTypes),
    images: Images(connection, DataTypes),
    // review: Reviews(connection, DataTypes)
};

// Define the association between User and Device
db.user.hasMany(db.product, { foreignKey: 'seller', as: 'products' })
db.product.hasMany(db.images, { foreignKey: 'prod_id', as: 'images' })
db.user.hasMany(db.order, { foreignKey: 'order_by', as: 'orders' })
db.user.hasMany(db.device, { foreignKey: 'user_id', as: 'devices' })

// db.user.hasMany(db.device);
// db.device.belongsTo(db.user);
// db.user.hasMany(db.order);
// db.order.belongsTo(db.user, { foreignKey: 'orderBy' });
// db.product.hasMany(db.images, { foreignKey: 'productId' });
// db.images.belongsTo(db.product, { foreignKey: 'id' });
// Order.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' });
// sync tables with the database.
// {alter:true}
// ({ force: false }
connection.sync({ alter: false })
    .then(() => console.log('Database tables synced.'))
    .catch((error: any) => console.error('Error syncing database:', error));

export default db