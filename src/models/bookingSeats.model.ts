import { DataTypes, Model, Sequelize } from 'sequelize';

export interface IBookingSeatAttributes {
    booking_id: number;
    seat_id: string;
    price: number;
}

export class BookingSeat extends Model<IBookingSeatAttributes> implements IBookingSeatAttributes {
    public booking_id!: number;
    public seat_id!: string;
    public price!: number;
}

const BookingSeatModel = (sequelize: Sequelize): typeof BookingSeat => {
    BookingSeat.init({
        booking_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id'
            }
        },
        seat_id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "booking_seats",
        freezeTableName: true,
        timestamps: false // No timestamps for this table
    });

    return BookingSeat;
};

export default BookingSeatModel;
