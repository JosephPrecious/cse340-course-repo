import db from './db.js';

/**
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

/**
 * Get single category by ID
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

/**
 * Get all projects for a category
 */
const getProjectsByCategory = async (categoryId) => {

    const query = `
        SELECT
            project.project_id,
            project.name,
            project.description
        FROM project
        INNER JOIN project_category
            ON project.project_id = project_category.project_id
        WHERE project_category.category_id = $1
        ORDER BY project.name;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

export {
    getAllCategories,
    getCategoryById,
    getProjectsByCategory
};