import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganization
} from '../models/organizations.js';

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
const getOrganizationByIdController = async (req, res, next) => {

    try {

        const id = parseInt(req.params.id, 10);

        if (!id) {
            return next();
        }

        const organization = await getOrganizationById(id);

        if (!organization) {
            return next();
        }

        const projects = await getProjectsByOrganization(id);

        res.render('organization-details', {
            title: organization.name,
            organization,
            projects
        });

    } catch (error) {

        next(error);
    }
};

export {
    getOrganizations,
    getOrganizationByIdController
};