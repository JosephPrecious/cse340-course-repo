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
            project.location,
            organization.organization_id,
            organization.name AS organization_name
        FROM project
        JOIN organization
            ON project.organization_id =
                organization.organization_id
        ORDER BY project.project_date ASC;
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
            project.location,
            organization.organization_id,
            organization.name AS organization_name
        FROM project
        JOIN organization
            ON project.organization_id =
                organization.organization_id
        WHERE project.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows[0];
};

/*
 * Get categories by project
 */
const getCategoriesByProject = async (
    projectId
) => {

    const query = `
        SELECT
            category.category_id,
            category.name
        FROM category
        JOIN project_category
            ON category.category_id =
                project_category.category_id
        WHERE project_category.project_id = $1
        ORDER BY category.name;
    `;

    const result = await db.query(
        query,
        [projectId]
    );

    return result.rows;
};

/*
 * Create new project
 */
const createProject = async (
    organizationId,
    name,
    description,
    location,
    projectDate
) => {

    const query = `
        INSERT INTO project (
            organization_id,
            name,
            description,
            location,
            project_date
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const values = [
        organizationId,
        name,
        description,
        location,
        projectDate
    ];

    const result = await db.query(
        query,
        values
    );

    return result.rows[0].project_id;
};

/*
 * Update project
 */
const updateProject = async (
    projectId,
    organizationId,
    name,
    description,
    location,
    projectDate
) => {

    const query = `
        UPDATE project
        SET
            organization_id = $1,
            name = $2,
            description = $3,
            location = $4,
            project_date = $5
        WHERE project_id = $6;
    `;

    const values = [
        organizationId,
        name,
        description,
        location,
        projectDate,
        projectId
    ];

    await db.query(query, values);
};

export {
    getAllProjects,
    getProjectById,
    getCategoriesByProject,
    createProject,
    updateProject
};