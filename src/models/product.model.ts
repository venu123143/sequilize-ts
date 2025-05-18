import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface ProductAttributes {
    id?: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    discount?: number;
    quantity: number;
    original_price: number;
    thumbnail_img: string;
    overall_rating?: number;
    details: any;
    seller: number;
}

export class Product extends Model<ProductAttributes, Optional<ProductAttributes, 'id' | 'discount' | 'overall_rating'>> implements ProductAttributes {
    public id!: number;
    public title!: string;
    public slug!: string;
    public description!: string;
    public price!: number;
    public discount!: number;
    public quantity!: number;
    public original_price!: number;
    public thumbnail_img!: string;
    public overall_rating!: number;
    public details!: any;
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
        original_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thumbnail_img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        overall_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        details: {
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
