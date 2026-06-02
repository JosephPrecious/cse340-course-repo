import {
    getAllProjects as fetchAllProjects,
    getProjectById as fetchProjectById,
    getCategoriesByProject
} from '../models/projects.js';

/**
 * Display all projects
 */
const getAllProjects = async (req, res, next) => {

    try {

        const projects = await fetchAllProjects();

        res.render('projects', {
            title: 'Service Projects',
            projects
        });

    } catch (error) {

        next(error);
    }
};

/**
 * Display single project details
 */
const getProjectById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const project = await fetchProjectById(id);

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