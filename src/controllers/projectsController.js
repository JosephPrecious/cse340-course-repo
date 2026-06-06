import {
    getAllProjects as fetchAllProjects,
    getProjectById as fetchProjectById,
    getCategoriesByProject
} from '../models/projects.js';

/*
 * GET /projects
 */
const getAllProjects = async (req, res, next) => {

    try {

        const projects = await fetchAllProjects();

        res.render('projects', {
            title: 'Upcoming Service Projects',
            projects
        });

    } catch (error) {

        next(error);
    }
};

/*
 * GET /project/:id
 */
const getProjectById = async (req, res, next) => {

    try {

        const id = parseInt(req.params.id, 10);

        if (!id) {
            return next();
        }

        const project = await fetchProjectById(id);

        if (!project) {
            return next();
        }

        const categories = await getCategoriesByProject(id);

        res.render('project-details', {
            title: project.name,
            project,
            categories
        });

    } catch (error) {

        next(error);
    }
};

export {
    getAllProjects,
    getProjectById
};