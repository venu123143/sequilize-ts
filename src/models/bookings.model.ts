import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import db from "@/config/db";

export enum BookingStatus {
    RESERVED = 'reserved',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled'
}

export interface IBookingAttributes {
    id?: number;
    user_id: string;
    event_id: string;
    showtime_id: string;
    status: BookingStatus;
    total_amount: number;
    created_at?: Date;
    updated_at?: Date;
}

export class Booking extends Model<IBookingAttributes, Optional<IBookingAttributes, 'id'>> implements IBookingAttributes {
    public id!: number;
    public user_id!: string;
    public event_id!: string;
    public showtime_id!: string;
    public status!: BookingStatus;
    public total_amount!: number;

    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

const BookingModel = (sequelize: Sequelize): typeof Booking => {
    Booking.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        showtime_id: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(...Object.values(BookingStatus)),
            allowNull: false
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "bookings",
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Booking;
};

export default BookingModel;
