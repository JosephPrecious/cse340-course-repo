import db from './db.js';

/*
 * Get all organizations
 */
const getAllOrganizations = async () => {

    const query = `
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM organization
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

/*
 * Get organization by ID
 */
const getOrganizationById = async (organizationId) => {

    const query = `
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM organization
        WHERE organization_id = $1;
    `;

    const result = await db.query(query, [organizationId]);

    return result.rows[0];
};

/*
 * Get projects for organization
 */
const getProjectsByOrganization = async (organizationId) => {

    const query = `
        SELECT
            project_id,
            name,
            description,
            date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const result = await db.query(query, [organizationId]);

    return result.rows;
};

export {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganization
};