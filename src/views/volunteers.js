import db from './db.js';

/*
 * Add volunteer
 */
const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
    `;

    await db.query(query, [userId, projectId]);
};

/*
 * Remove volunteer
 */
const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;

    await db.query(query, [userId, projectId]);
};

/*
 * Get projects user volunteered for
 */
const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT p.*
        FROM project p
        JOIN volunteers v ON p.project_id = v.project_id
        WHERE v.user_id = $1
        ORDER BY p.project_date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    getVolunteerProjects
};