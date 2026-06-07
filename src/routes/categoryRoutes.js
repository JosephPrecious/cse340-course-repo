import express from 'express';

import {
    getAllCategories,
    getCategoryById,
    renderNewCategoryForm,
    createNewCategory,
    renderEditCategoryForm,
    editCategory
} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/categories', getAllCategories);

router.get('/category/:id', getCategoryById);

router.get('/new-category', renderNewCategoryForm);

router.post('/new-category', createNewCategory);

router.get('/edit-category/:id', renderEditCategoryForm);

router.post('/edit-category/:id', editCategory);

export default router;