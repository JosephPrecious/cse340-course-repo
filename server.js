import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { testConnection } from './src/models/db.js';

import categoryRoutes from './src/routes/categoryRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import organizationRoutes from './src/routes/organizationRoutes.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

// Define the port number
const PORT = process.env.PORT || 3000;

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

/**
 * Middleware
 */

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as template engine
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Routes
 */

// Home Route
app.get('/', (req, res) => {
    res.render('home', {
        title: 'CSE 340 Service Network'
    });
});

// Organizations Routes
app.use('/', organizationRoutes);

// Projects Routes
app.use('/', projectRoutes);

// Categories Routes
app.use('/', categoryRoutes);

app.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.url);
    next();
});

/**
 * Test Route for 500 Errors
 */
app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
});

/**
 * 404 Catch-All Route
 */
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    const status = err.status || 500;

    const template = status === 404
        ? '404'
        : '500';

    const context = {
        title: status === 404
            ? 'Page Not Found'
            : 'Server Error',

        error: err.message,
        stack: err.stack,
        NODE_ENV
    };

    res.status(status).render(
        `errors/${template}`,
        context
    );
});

/**
 * Start Server
 */
app.listen(PORT, async () => {

    try {

        await testConnection();

        console.log(
            `Database connection successful`
        );

        console.log(
            `Server is running at http://127.0.0.1:${PORT}`
        );

        console.log(
            `Environment: ${NODE_ENV}`
        );

    } catch (error) {

        console.error(
            'Error connecting to the database:',
            error
        );
    }
});