import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import db from "@/config/db"

export interface IImageAttributes {
    id?: number;
    url: string;
    prod_id: number;
}

export class Image extends Model<IImageAttributes, Optional<IImageAttributes, 'id'>> implements IImageAttributes {
    public id!: number;
    public url!: string;
    public prod_id!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const ImageModel = (sequelize: Sequelize): typeof Image => {
    Image.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        prod_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
    }, {
        sequelize,
        tableName: "images",
        freezeTableName: true,
        timestamps: true,
    });

    return Image;
};

export default ImageModel;