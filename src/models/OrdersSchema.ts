import { Model, Optional, DataTypes, Sequelize } from 'sequelize';
import { UserModel } from './UserModel';

interface IShippingInfo {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    landmark?: string;
    pincode: number;
    mobile: string;
}

interface IPaymentInfo {
    razorPayOrderId: string;
    razorPayPaymentId: string;
}

interface IOrderItem {
    product: string;
    color: string;
    quantity: number;
    price: number;
}

interface IOrder extends Model {
    id: number;
    shippingInfo: IShippingInfo;
    paymentInfo: IPaymentInfo;
    orderItems: IOrderItem[];
    order_by: number;
    totalPrice: number;
    orderStatus: string;
}

interface OrderCreationAttributes extends Optional<IOrder, 'id'> { }

export interface OrderModel extends Model<IOrder, OrderCreationAttributes> { }

const OrderModel = (sequelize: Sequelize, DataTypes: any) => {
    const Order = sequelize.define<IOrder>('orders', {
        shippingInfo: {
            type: DataTypes.JSON, // Store as JSON in MySQL
            allowNull: false,
        },
        paymentInfo: {
            type: DataTypes.JSON, // Store as JSON in MySQL
            allowNull: false,
        },
        orderItems: {
            type: DataTypes.JSON, // Store as JSON in MySQL
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2), // Store as DECIMAL in MySQL
            allowNull: false,
        },
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, { timestamps: true, freezeTableName: true });
    return Order;
};

export default OrderModel;
