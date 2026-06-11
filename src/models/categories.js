import db from './db.js';

/*
 * Get all categories
 */
const getAllCategories = async () => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

/*
 * Get category by ID
 */
const getCategoryById = async (id) => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

/*
 * Get projects by category
 */
const getProjectsByCategory = async (categoryId) => {

    const query = `
        SELECT
            project.project_id,
            project.name,
            project.description
        FROM project
        JOIN project_category
            ON project.project_id = project_category.project_id
        WHERE project_category.category_id = $1
        ORDER BY project.name;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

/*
 * Create category
 */
const createCategory = async (name) => {

    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING *;
    `;

    const result = await db.query(query, [name]);

    return result.rows[0];
};

/*
 * Update category
 */
const updateCategory = async (id, name) => {

    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING *;
    `;

    const result = await db.query(query, [name, id]);

    return result.rows[0];
};

/*
 * Assign category to project
 */
const assignCategoryToProject = async (
    projectId,
    categoryId
) => {

    const query = `
        INSERT INTO project_category (
            project_id,
            category_id
        )
        VALUES ($1, $2);
    `;

    await db.query(
        query,
        [projectId, categoryId]
    );
};

/*
 * Update category assignments
 */
const updateCategoryAssignments = async (
    projectId,
    categoryIds
) => {

    await db.query(
        `
        DELETE FROM project_category
        WHERE project_id = $1;
        `,
        [projectId]
    );

    if (!categoryIds) {
        return;
    }

    const categories = Array.isArray(categoryIds)
        ? categoryIds
        : [categoryIds];

    for (const categoryId of categories) {

        await assignCategoryToProject(
            projectId,
            categoryId
        );
    }
};

/*
 * Get categories by project ID
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
    getAllCategories,
    getCategoryById,
    getProjectsByCategory,
    getCategoriesByProject,
    createCategory,
    updateCategory,
    updateCategoryAssignments
};