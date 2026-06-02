import express from 'express';

import {
    getOrganizations,
    getOrganizationByIdController
} from '../controllers/organizations.js';

const router = express.Router();

/*
 * Organizations list page
 */
router.get('/organizations', getOrganizations);

/*
 * Single organization page
 */
router.get('/organization/:id', getOrganizationByIdController);

export default router;