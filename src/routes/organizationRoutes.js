import express from 'express';

import {
    getOrganizations,
    getOrganizationByIdController
} from '../controllers/organizationsController.js';

const router = express.Router();

router.get('/organizations', getOrganizations);

router.get('/organization/:id', getOrganizationByIdController);

export default router;