import { DataTypes, Model, Sequelize } from 'sequelize';

export interface IBookingAnalyticsAttributes {
    timestamp: Date;
    booking_id: number;
    user_id: number;
    event_id: string;
    amount: number;
    seats: number;
    status: string;
}

export class BookingAnalytics extends Model<IBookingAnalyticsAttributes> implements IBookingAnalyticsAttributes {
    public timestamp!: Date;
    public booking_id!: number;
    public user_id!: number;
    public event_id!: string;
    public amount!: number;
    public seats!: number;
    public status!: string;
}

const BookingAnalyticsModel = (sequelize: Sequelize): typeof BookingAnalytics => {
    BookingAnalytics.init({
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        booking_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id'
            }
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
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        seats: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "bookings_analytics",
        freezeTableName: true,
        timestamps: false, // No timestamps as we have our own timestamp field
        indexes: [
            {
                fields: ['timestamp']
            },
            {
                fields: ['user_id']
            },
            {
                fields: ['booking_id']
            },
            {
                fields: ['event_id']
            },
            {
                fields: ['status']
            }
        ]
    });

    return BookingAnalytics;
};

export default BookingAnalyticsModel;
