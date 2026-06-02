import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
});

let db = pool;

const testConnection = async () => {
    try {
        const result = await db.query('SELECT NOW() as current_time');

        console.log(
            'Database connection successful:',
            result.rows[0].current_time
        );

        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

export default db;
export { testConnection };