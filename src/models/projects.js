import db from './db.js';

/*
 * Get all projects
 */
const getAllProjects = async () => {

    const query = `
        SELECT 
            project.project_id,
            project.name,
            project.description,
            project.project_date,
            organization.organization_id,
            organization.name AS organization_name
        FROM project
        JOIN organization
            ON project.organization_id = organization.organization_id
        ORDER BY project.project_date;
    `;

    const result = await db.query(query);

    return result.rows;
};

/*
 * Get project by ID
 */
const getProjectById = async (projectId) => {

    const query = `
        SELECT 
            project.project_id,
            project.name,
            project.description,
            project.project_date,
            organization.organization_id,
            organization.name AS organization_name
        FROM project
        JOIN organization
            ON project.organization_id = organization.organization_id
        WHERE project.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows[0];
};

/*
 * Get categories for a project
 */
const getCategoriesByProject = async (projectId) => {

    const query = `
        SELECT
            category.category_id,
            category.name
        FROM category
        JOIN project_category
            ON category.category_id = project_category.category_id
        WHERE project_category.project_id = $1
        ORDER BY category.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

/*
 * Get projects by organization ID
 */
const getProjectsByOrganizationId = async (organizationId) => {

    const query = `
        SELECT
            project_id,
            name,
            description,
            project_date
        FROM project
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const result = await db.query(query, [organizationId]);

    return result.rows;
};

export {
    getAllProjects,
    getProjectById,
    getCategoriesByProject,
    getProjectsByOrganizationId
};