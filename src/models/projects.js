import db from './db.js';

/*
 * Get upcoming projects
 */
const getAllProjects = async () => {

    const query = `
        SELECT
            project.project_id,
            project.name,
            project.description,
            project.project_date,
            project.location,
            organization.organization_id,
            organization.name AS organization_name
        FROM project
        JOIN organization
            ON project.organization_id = organization.organization_id
        ORDER BY project.project_date ASC;
    `;

    const result = await db.query(query);

    return result.rows;
};

/*
 * Get single project
 */
const getProjectById = async (projectId) => {

    const query = `
        SELECT
            project.project_id,
            project.name,
            project.description,
            project.project_date,
            project.location,
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
 * Get categories for project
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

export {
    getAllProjects,
    getProjectById,
    getCategoriesByProject
};