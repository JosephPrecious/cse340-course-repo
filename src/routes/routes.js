import express from 'express';

import {
    organizationValidation,
    getOrganizations,
    getOrganizationByIdController,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
} from '../controllers/organizationsController.js';

import {
    projectValidation,
    getAllProjects,
    getProjectById,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm
} from '../controllers/projectsController.js';

import {
    getAllCategories,
    getCategoryById,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from '../controllers/categoriesController.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    requireLogin,
    requireAdmin,
    showUsersPage 
} from '../controllers/usersController.js';

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
router.get(
    '/organizations',
    getOrganizations
);

router.get(
    '/organization/:id',
    getOrganizationByIdController
);

/*
 * New Organization
 */
router.get(
    '/new-organization',
    showNewOrganizationForm
);

router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);

/*
 * Edit Organization
 */
router.get(
    '/edit-organization/:id',
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

/*
 * Project Routes
 */
router.get(
    '/projects',
    getAllProjects
);

router.get(
    '/project/:id',
    getProjectById
);

/*
 * New Project
 */
router.get(
    '/new-project',
    showNewProjectForm
);

router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

/*
 * Edit Project
 */
router.get(
    '/edit-project/:id',
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);

/*
 * Category Routes
 */
router.get(
    '/categories',
    getAllCategories
);

router.get(
    '/category/:id',
    getCategoryById
);

/*
 * Assign Categories
 */
router.get(
    '/project/:projectId/assign-categories',
    showAssignCategoriesForm
);

router.post(
    '/project/:projectId/assign-categories',
    processAssignCategoriesForm
);

/*
 * Register Routes
 */
router.get(
    '/register',
    showUserRegistrationForm
);

router.post(
    '/register',
    processUserRegistrationForm
);

/*
 * Login Routes
 */
router.get(
    '/login',
    showLoginForm
);

router.post(
    '/login',
    processLoginForm
);

router.get(
    '/logout',
    processLogout
);

/*
 * Dashboard
 */
router.get(
    '/dashboard',
    requireLogin,
    showDashboard
);

/*
 * Admin Users Page
 */
router.get(
    '/users',
    requireLogin,
    requireAdmin,
    showUsersPage
);

export default router;