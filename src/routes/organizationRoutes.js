import express from 'express';

import {
    getOrganizations,
    getOrganizationByIdController
} from '../controllers/organizationsController.js';

const router = express.Router();

/*
 * Organizations list page
 */
router.get('/organizations', getOrganizations);

/*
 * Single organization page
 */
router.get('/organizations/:id', getOrganizationByIdController);

export default router;