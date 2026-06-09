import express from 'express';

import {
    getOrganizations,
    getOrganizationByIdController
} from '../controllers/organizationsController.js';

import {
    getAllProjects,
    getProjectById
} from '../controllers/projectsController.js';

import {
    getAllCategories,
    getCategoryById
} from '../controllers/categoriesController.js';

const router = express.Router();

/*
 * Home Page
 */
router.get('/', (req, res) => {

    res.render('home', {
        title: 'CSE 340 Service Network'
    });
});

/*
 * Organization Routes
 */
router.get('/organizations', getOrganizations);

router.get(
    '/organization/:id',
    getOrganizationByIdController
);

/*
 * Project Routes
 */
router.get('/projects', getAllProjects);

router.get('/project/:id', getProjectById);

/*
 * Category Routes
 */
router.get('/categories', getAllCategories);

router.get('/category/:id', getCategoryById);

export default router;