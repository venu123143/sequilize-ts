import { Request, Response } from "express"
import db from "../config/db"
import slugify from "slugify";
import { UserModel } from "models/UserModel";


export const createProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.user as UserModel;
        const { title, description, price, quantity,
            discount, originalPrice, thumbnailImg,
            overallRating, Details } = req.body;
        if (originalPrice < price) {
            res.status(403).json({ message: "original price should be greater than price" })
            return
        }
        let slug = slugify(req.body?.title)

        const newProduct = await db.product.create({
            title,
            slug,
            description,
            price,
            quantity,
            discount,
            originalPrice,
            thumbnailImg,
            overallRating,
            Details,
            seller: id,
        });

        return res.status(201).json(newProduct);
    } catch (error: any) {
        return res.status(500).json({ message: error?.errors[0].message, error });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const exising = await db.product.findByPk(id)
        if (!exising) {
            res.json({ message: 'no product present with this id' })
        }
        const prod = await db.product.update(req.body, { where: { id } })
        res.json(prod)
    } catch (error: any) {
        res.json(error)

    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const product = await db.product.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        // const products = await Product.findAll();
        // return res.json(products);

        const search = req.query.search as string || '';
        const sortColumn = req.query.sortColumn as string || 'createdAt';
        const sortOrder = req.query.sortOrder as string || 'DESC';
        const { Op } = require('sequelize');

        // ...

        const searchResults = await db.product.findAndCountAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ]
            },
            attributes: { exclude: ['quantity', 'images', 'sold', 'overAllRating', 'updatedAt'] },
            order: [[sortColumn, sortOrder]]
        });


        if (searchResults.count === 0) {
            return res.status(404).json({
                message: "No users found in the table.",
            });
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;


        const offset = (page - 1) * limit;
        const paginatedProduct = searchResults.rows.slice(offset, offset + limit);

        return res.status(200).json({
            message: "Users fetched successfully.",
            totalCount: searchResults.count,
            currentPage: page,
            totalPages: Math.ceil(searchResults.count / limit),
            users: paginatedProduct,
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await db.product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}