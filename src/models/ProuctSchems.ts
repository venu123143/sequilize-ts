import { Model, Optional, Sequelize } from "sequelize"
interface ProductAttributes {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    originalPrice: number;
    thumbnailImg: string;
    overallRating: number;
    Details: any;
    seller: any;
}
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }
export interface ProductModel extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes { }

const ProductModel = (sequelize: Sequelize, DataTypes: any) => {
    const Product = sequelize.define<ProductModel>('products',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            discount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            originalPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            thumbnailImg: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            overallRating: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            Details: {
                type: DataTypes.JSON,
            },
            seller: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
        })

    return Product
}

export default ProductModel