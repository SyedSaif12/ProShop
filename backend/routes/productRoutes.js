import express from 'express';
import { get } from 'mongoose';
const router = express.Router()
import { getProducts, getProductByID}  from '../controllers/productController.js';


router.route('/').get(getProducts)
router.route('/:id').get(getProductByID)


export default router