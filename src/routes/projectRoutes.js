import express from 'express';

import {
    getAllProjects,
    getProjectById
} from '../controllers/projectsController.js';

const router = express.Router();

router.get('/projects', getAllProjects);

router.get('/project/:id', getProjectById);

export default router;