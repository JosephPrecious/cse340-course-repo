import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { testConnection } from './src/models/db.js';

import categoryRoutes from './src/routes/categoryRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import organizationRoutes from './src/routes/organizationRoutes.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/*
 * Middleware
 */

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'src/views'));

/*
 * Routes
 */

app.get('/', (req, res) => {

    res.render('home', {
        title: 'CSE 340 Service Network'
    });
});

/*
 * Route Files
 */

app.use('/', organizationRoutes);
app.use('/', projectRoutes);
app.use('/', categoryRoutes);

/*
 * 404 Handler
 */

app.use((req, res, next) => {

    const err = new Error('Page Not Found');

    err.status = 404;

    next(err);
});

/*
 * Global Error Handler
 */

app.use((err, req, res, next) => {

    console.error(err);

    const status = err.status || 500;

    const view = status === 404
        ? 'errors/404'
        : 'errors/500';

    res.status(status).render(view, {
        title: status === 404
            ? 'Page Not Found'
            : 'Server Error',

        error: err.message,
        NODE_ENV
    });
});

/*
 * Start Server
 */

app.listen(PORT, async () => {

    try {

        await testConnection();

        console.log(`Server running on port ${PORT}`);

    } catch (error) {

        console.error(error);
    }
});