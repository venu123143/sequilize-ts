/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: The product ID
 *       title:
 *         type: string
 *         description: The product title
 *       description:
 *         type: string
 *         description: The product description
 *       price:
 *         type: number
 *         description: The product price
 *       discount:
 *         type: number
 *         description: The product discount
 *       quantity:
 *         type: number
 *         description: The product quantity
 *       originalPrice:
 *         type: number
 *         description: The original product price
 *       thumbnailImg:
 *         type: string
 *         description: The product's thumbnail image URL
 *       overallRating:
 *         type: number
 *         description: The product's overall rating
 *       Details:
 *         type: object
 *         description: Additional product details
 *       seller:
 *         type: string
 *         description: The ID of the product's seller
 */


import { authMiddleware } from "../middleware/AuthMiddleware"
import { createProduct, deleteProduct, getProducts, updateProduct, getSingleProduct } from "../controllers/productController"
import express from "express"

const router = express.Router()

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       description: New product details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, createProduct)

/** 
 * @swagger
 * /products/{id}:
*   put:
*     summary: Update a product by ID
*     tags: [Products]
*     parameters:
*       - name: id
*         in: path
*         description: The ID of the product to update
*         required: true
*         type: string
*     requestBody:
*       description: Updated product details
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '../models/ProuctSchems'
*     responses:
*       200:
*         description: Product updated successfully
*         schema:
*         $ref: '../models/ProuctSchems'
*       404:
*         description: Product not found
*       400:
*         description: Bad request
*/
router.put('/:id', updateProduct)
/** 
 * @swagger
 * /products/{id}:
 *    delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the product to delete
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', deleteProduct)

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns a list of products
 *         schema:
 *           type: array
 *           items:
 *              $ref: '../models/ProuctSchems'
 * */
router.get('/', authMiddleware, getProducts)

/**
 *  @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the product to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns a product
 *         schema:
 *            $ref: '../models/ProuctSchems'
 *       404:
 *         description: Product not found
 * */
router.get('/:id', getSingleProduct)

export default router


