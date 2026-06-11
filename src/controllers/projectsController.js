import {
    body,
    validationResult
} from 'express-validator';

import {
    getAllProjects as fetchAllProjects,
    getProjectById as fetchProjectById,
    getCategoriesByProject,
    createProject,
    updateProject
} from '../models/projects.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

/*
 * Validation Rules
 */
const projectValidation = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage(
            'Project name is required'
        )
        .isLength({
            min: 3,
            max: 200
        })
        .withMessage(
            'Project name must be between 3 and 200 characters'
        ),

    body('description')
        .trim()
        .notEmpty()
        .withMessage(
            'Project description is required'
        )
        .isLength({
            max: 1000
        })
        .withMessage(
            'Description cannot exceed 1000 characters'
        ),

    body('location')
        .trim()
        .notEmpty()
        .withMessage(
            'Location is required'
        )
        .isLength({
            max: 200
        })
        .withMessage(
            'Location cannot exceed 200 characters'
        ),

    body('projectDate')
        .notEmpty()
        .withMessage(
            'Project date is required'
        )
        .isDate()
        .withMessage(
            'Project date must be valid'
        ),

    body('organizationId')
        .notEmpty()
        .withMessage(
            'Organization is required'
        )
        .isInt()
        .withMessage(
            'Organization must be valid'
        )
];

/*
 * GET /projects
 */
const getAllProjects = async (
    req,
    res,
    next
) => {

    try {

        const projects =
            await fetchAllProjects();

        res.render('projects', {
            title:
                'Upcoming Service Projects',
            projects
        });

    } catch (error) {

        next(error);
    }
};

/*
 * GET /project/:id
 */
const getProjectById = async (
    req,
    res,
    next
) => {

    try {

        const id = parseInt(
            req.params.id,
            10
        );

        if (!id) {
            return next();
        }

        const project =
            await fetchProjectById(id);

        if (!project) {
            return next();
        }

        const categories =
            await getCategoriesByProject(id);

        res.render(
            'project-details',
            {
                title: project.name,
                project,
                categories
            }
        );

    } catch (error) {

        next(error);
    }
};

/*
 * GET /new-project
 */
const showNewProjectForm = async (
    req,
    res,
    next
) => {

    try {

        const organizations =
            await getAllOrganizations();

        res.render('new-project', {
            title:
                'Add New Service Project',
            organizations,
            errors: []
        });

    } catch (error) {

        next(error);
    }
};

/*
 * POST /new-project
 */
const processNewProjectForm = async (
    req,
    res,
    next
) => {

    try {

        const errors =
            validationResult(req);

        if (!errors.isEmpty()) {

            const organizations =
                await getAllOrganizations();

            return res.render(
                'new-project',
                {
                    title:
                        'Add New Service Project',
                    organizations,
                    errors: errors.array()
                }
            );
        }

        const {
            organizationId,
            name,
            description,
            location,
            projectDate
        } = req.body;

        const projectId =
            await createProject(
                organizationId,
                name,
                description,
                location,
                projectDate
            );

        res.redirect(
            `/project/${projectId}`
        );

    } catch (error) {

        next(error);
    }
};

/*
 * GET /edit-project/:id
 */
const showEditProjectForm = async (
    req,
    res,
    next
) => {

    try {

        const id = parseInt(
            req.params.id,
            10
        );

        const project =
            await fetchProjectById(id);

        const organizations =
            await getAllOrganizations();

        res.render('edit-project', {
            title: 'Edit Project',
            project,
            organizations,
            errors: []
        });

    } catch (error) {

        next(error);
    }
};

/*
 * POST /edit-project/:id
 */
const processEditProjectForm = async (
    req,
    res,
    next
) => {

    try {

        const id = parseInt(
            req.params.id,
            10
        );

        const errors =
            validationResult(req);

        if (!errors.isEmpty()) {

            const organizations =
                await getAllOrganizations();

            const project =
                await fetchProjectById(id);

            return res.render(
                'edit-project',
                {
                    title: 'Edit Project',
                    project,
                    organizations,
                    errors: errors.array()
                }
            );
        }

        const {
            organizationId,
            name,
            description,
            location,
            projectDate
        } = req.body;

        await updateProject(
            id,
            organizationId,
            name,
            description,
            location,
            projectDate
        );

        res.redirect(`/project/${id}`);

    } catch (error) {

        next(error);
    }
};

export {
    projectValidation,
    getAllProjects,
    getProjectById,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm
};