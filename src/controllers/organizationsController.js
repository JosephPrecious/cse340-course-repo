import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganization
} from '../models/organizations.js';

/*
 * GET /organizations
 */
const getOrganizations = async (req, res) => {

    const organizations = await getAllOrganizations();

    res.render('organizations', {
        title: 'Organizations',
        organizations
    });
};

/*
 * GET /organization/:id
 */
const getOrganizationByIdController = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id, 10);

        // ✅ instead of throwing "invalid id", just go 404
        if (!id) {
            return next(); // sends to 404 handler
        }

        const organization = await getOrganizationById(id);
        const projects = await getProjectsByOrganization(id);

        if (!organization) {
            return next(); // 404 if not found
        }

        res.render('organization', {
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