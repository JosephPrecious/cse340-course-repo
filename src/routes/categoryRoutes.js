import express from 'express';

import {
    getAllCategories,
    getCategoryById
} from '../controllers/categoriesController.js';

const router = express.Router();

/*
 * Categories list
 */

router.get('/categories', getAllCategories);

/*
 * Single category
 */

router.get('/categories/:id', getCategoryById);

export default router;