import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc Fetch All Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    //res.status(401).json({message: 'Un authenticated Call has been made'})
    res.json(products)
})


// @desc Fetch Single Product
// @route GET /api/products
// @access Public
const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    }
    else {
        //res.status(404).json({message: 'Product not found'})
        res.status(404)
        throw new Error('Product not found')
    }
    // res.json(product)
})

export {
    getProducts,
    getProductByID,
}