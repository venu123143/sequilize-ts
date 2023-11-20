import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface ImageAttributes {
    id: number;
    url: string;
    prod_id: number;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, "id"> { }

export interface ImageModel extends Model<ImageAttributes, ImageCreationAttributes> { }

const ImageModel = (sequelize: Sequelize, DataTypes: any) => {
    const Image = sequelize.define<ImageModel>('images', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prod_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        }

    });
    return Image;
};

export default ImageModel;
