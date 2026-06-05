import express from 'express';

import {
    getAllProjects,
    getProjectById
} from '../controllers/projectsController.js';

const router = express.Router();

/*
 * Projects list
 */

router.get('/projects', getAllProjects);

/*
 * Single project
 */

router.get('/projects/:id', getProjectById);

export default router;