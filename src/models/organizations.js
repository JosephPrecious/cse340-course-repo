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
            project_date,
            location
        FROM project
        WHERE organization_id = $1
        ORDER BY project_date ASC;
    `;

    const result = await db.query(query, [organizationId]);

    return result.rows;
};

/*
 * Create organization
 */
const createOrganization = async (
    name,
    description,
    contactEmail,
    logoFilename
) => {

    const query = `
        INSERT INTO organization (
            name,
            description,
            contact_email,
            logo_filename
        )
        VALUES ($1, $2, $3, $4)
        RETURNING organization_id;
    `;

    const values = [
        name,
        description,
        contactEmail,
        logoFilename
    ];

    const result = await db.query(query, values);

    return result.rows[0].organization_id;
};

/*
 * Update organization
 */
const updateOrganization = async (
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename
) => {

    const query = `
        UPDATE organization
        SET
            name = $1,
            description = $2,
            contact_email = $3,
            logo_filename = $4
        WHERE organization_id = $5;
    `;

    const values = [
        name,
        description,
        contactEmail,
        logoFilename,
        organizationId
    ];

    await db.query(query, values);
};

export {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganization,
    createOrganization,
    updateOrganization
};