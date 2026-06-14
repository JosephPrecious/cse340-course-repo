import db from './db.js';

/*
 * Add volunteer to project
 */
const addVolunteer = async (userId, projectId) => {

    const query = `
        INSERT INTO project_volunteer (
            user_id,
            project_id
        )
        VALUES ($1, $2)
        ON CONFLICT (
            user_id,
            project_id
        )
        DO NOTHING
        RETURNING *;
    `;

    const result = await db.query(
        query,
        [userId, projectId]
    );

    return result.rows[0];
};

/*
 * Remove volunteer
 */
const removeVolunteer = async (
    userId,
    projectId
) => {

    const query = `
        DELETE FROM project_volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    await db.query(
        query,
        [userId, projectId]
    );
};

/*
 * Check if user is volunteering
 */
const isVolunteer = async (
    userId,
    projectId
) => {

    const query = `
        SELECT *
        FROM project_volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result = await db.query(
        query,
        [userId, projectId]
    );

    return result.rows.length > 0;
};

/*
 * Get projects user volunteered for
 */
const getVolunteerProjects = async (
    userId
) => {

    const query = `
        SELECT
            p.project_id,
            p.name,
            p.description,
            p.project_date,
            p.location
        FROM project p
        JOIN project_volunteer pv
            ON p.project_id = pv.project_id
        WHERE pv.user_id = $1
        ORDER BY p.project_date;
    `;

    const result = await db.query(
        query,
        [userId]
    );

    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    isVolunteer,
    getVolunteerProjects
};