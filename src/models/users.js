import db from './db.js';
import bcrypt from 'bcrypt';

/*
 * Create user
 */
const createUser = async (
    name,
    email,
    passwordHash
) => {

    const query = `
        INSERT INTO users (
            name,
            email,
            password_hash,
            role_id
        )
        VALUES (
            $1,
            $2,
            $3,
            (
                SELECT role_id
                FROM roles
                WHERE role_name = 'user'
            )
        )
        RETURNING
            user_id,
            name,
            email;
    `;

    const result = await db.query(
        query,
        [name, email, passwordHash]
    );

    return result.rows[0];
};

/*
 * Find user by email
 */
const findUserByEmail = async (email) => {

    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            u.password_hash,
            u.role_id,
            r.role_name
        FROM users u
        JOIN roles r
            ON u.role_id = r.role_id
        WHERE u.email = $1;
    `;

    const result = await db.query(
        query,
        [email]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

/*
 * Verify password
 */
const verifyPassword = async (
    password,
    passwordHash
) => {

    return bcrypt.compare(
        password,
        passwordHash
    );
};

/*
 * Authenticate user
 */
const authenticateUser = async (
    email,
    password
) => {

    const user =
        await findUserByEmail(email);

    if (!user) {
        return null;
    }

    const isValid =
        await verifyPassword(
            password,
            user.password_hash
        );

    if (!isValid) {
        return null;
    }

    delete user.password_hash;

    return user;
};

/*
 * Get all users
 */
const getAllUsers = async () => {

    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r
            ON u.role_id = r.role_id
        ORDER BY u.name;
    `;

    const result =
        await db.query(query);

    return result.rows;
};

export {
    createUser,
    authenticateUser,
    getAllUsers
};