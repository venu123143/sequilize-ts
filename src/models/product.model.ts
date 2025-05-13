import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface ProductAttributes {
    id?: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    discount?: number;
    quantity: number;
    originalPrice: number;
    thumbnailImg: string;
    overallRating?: number;
    Details: any;
    seller: number;
}

export class Product extends Model<ProductAttributes, Optional<ProductAttributes, 'id' | 'discount' | 'overallRating'>> implements ProductAttributes {
    public id!: number;
    public title!: string;
    public slug!: string;
    public description!: string;
    public price!: number;
    public discount!: number;
    public quantity!: number;
    public originalPrice!: number;
    public thumbnailImg!: string;
    public overallRating!: number;
    public Details!: any;
    public seller!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const ProductModel = (sequelize: Sequelize): typeof Product => {
    Product.init({
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
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        originalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thumbnailImg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        overallRating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Details: {
            type: DataTypes.JSON
        },
        seller: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'products',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
    });

    return Product;
};

export default ProductModel;
