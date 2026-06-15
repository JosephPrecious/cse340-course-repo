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
renderNewCategoryForm,
createNewCategory,
renderEditCategoryForm,
editCategory,
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

import {
    volunteerForProject,
    removeVolunteerFromProject
} from '../controllers/projectsController.js';

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
    requireLogin,
    requireAdmin,
    showNewOrganizationForm
);

router.post(
    '/new-organization',
    requireLogin,
    requireAdmin,
    organizationValidation,
    processNewOrganizationForm
);

/*
 * Edit Organization
 */
router.get(
    '/edit-organization/:id',
    requireLogin,
    requireAdmin,
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    requireLogin,
    requireAdmin,
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
    requireLogin,
    requireAdmin,
    showNewProjectForm
);

router.post(
    '/new-project',
    requireLogin,
    requireAdmin,
    projectValidation,
    processNewProjectForm
);

/*
 * Edit Project
 */
router.get(
    '/edit-project/:id',
    requireLogin,
    requireAdmin,
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    requireLogin,
    requireAdmin,
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

router.get(
    '/new-category',
    requireLogin,
    requireAdmin,
    renderNewCategoryForm
);

router.post(
    '/new-category',
    requireLogin,
    requireAdmin,
    createNewCategory
);

router.get(
    '/edit-category/:id',
    requireLogin,
    requireAdmin,
    renderEditCategoryForm
);

router.post(
    '/edit-category/:id',
    requireLogin,
    requireAdmin,   
    editCategory
);

/*
 * Assign Categories
 */
router.get(
    '/project/:projectId/assign-categories',
    requireLogin,
    requireAdmin,
    showAssignCategoriesForm
);

router.post(
    '/project/:projectId/assign-categories',
    requireLogin,
    requireAdmin,
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
 * Volunteer Routes (Week 6)
 */
router.post(
    '/project/:id/volunteer',
    requireLogin,
    volunteerForProject
);

router.post(
    '/project/:id/remove-volunteer',
    requireLogin,
    removeVolunteerFromProject
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