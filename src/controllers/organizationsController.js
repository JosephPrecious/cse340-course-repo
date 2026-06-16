import {
    body,
    validationResult
} from 'express-validator';

import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganization,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

/*
 * Validation Rules
 */
const organizationValidation = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage(
            'Organization name must be between 3 and 150 characters'
        ),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 500 })
        .withMessage(
            'Description cannot exceed 500 characters'
        ),

    body('contactEmail')
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
];

/*
 * GET /organizations
 */
const getOrganizations = async (req, res, next) => {

    try {

        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'Partner Organizations',
            organizations
        });

    } catch (error) {

        next(error);
    }
};

/*
 * GET /organization/:id
 */
const getOrganizationByIdController = async (
    req,
    res,
    next
) => {

    try {

        const id = parseInt(req.params.id, 10);

        if (!id) {
            return next();
        }

        const organization =
            await getOrganizationById(id);

        if (!organization) {
            return next();
        }

        const projects =
            await getProjectsByOrganization(id);

        res.render('organization-details', {
            title: organization.name,
            organization,
            projects
        });

    } catch (error) {

        next(error);
    }
};

/*
 * GET /new-organization
 */
const showNewOrganizationForm = async (
    req,
    res
) => {

    res.render('new-organization', {
        title: 'Add New Organization',
        errors: [],
        organization: {
            name: '',
            description: '',
            contactEmail: ''
        }
    });
};

/*
 * POST /new-organization
 */
const processNewOrganizationForm = async (
    req,
    res,
    next
) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.render(
                'new-organization',
                {
                    title: 'Add New Organization',
                    errors: errors.array(),
                    organization: req.body
                }
            );
        }

        const {
            name,
            description,
            contactEmail
        } = req.body;

        const logoFilename =
            'placeholder-logo.png';

        const organizationId =
            await createOrganization(
                name,
                description,
                contactEmail,
                logoFilename
            );

        res.redirect(
            `/organization/${organizationId}`
        );

    } catch (error) {

        next(error);
    }
};

/*
 * GET /edit-organization/:id
 */
const showEditOrganizationForm = async (
    req,
    res,
    next
) => {

    try {

        const id = parseInt(req.params.id, 10);

        const organization =
            await getOrganizationById(id);

        if (!organization) {
            return next();
        }

        res.render('edit-organization', {
            title: 'Edit Organization',
            organization,
            errors: []
        });

    } catch (error) {

        next(error);
    }
};

/*
 * POST /edit-organization/:id
 */
const processEditOrganizationForm = async (
    req,
    res,
    next
) => {

    try {

        const errors = validationResult(req);

        const id = parseInt(req.params.id, 10);

        if (!errors.isEmpty()) {

            return res.render(
                'edit-organization',
                {
                    title: 'Edit Organization',
                    organization: {
                        organization_id: id,
                        name: req.body.name,
                        description: req.body.description,
                        contact_email: req.body.contactEmail,
                        logo_filename: req.body.logoFilename
                    },
                    errors: errors.array()
                }
            );
        }

        const {
            name,
            description,
            contactEmail,
            logoFilename
        } = req.body;

        await updateOrganization(
            id,
            name,
            description,
            contactEmail,
            logoFilename
        );

        res.redirect(`/organization/${id}`);

    } catch (error) {

        next(error);
    }
};

export {
    organizationValidation,
    getOrganizations,
    getOrganizationByIdController,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
};
