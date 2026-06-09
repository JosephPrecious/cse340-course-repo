import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { testConnection } from './src/models/db.js';

import routes from './src/routes/routes.js';

const NODE_ENV =
    process.env.NODE_ENV?.toLowerCase()
    || 'development';

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

/*
 * Middleware
 */

app.use(express.static(
    path.join(__dirname, 'public')
));

app.set('view engine', 'ejs');

app.set(
    'views',
    path.join(__dirname, 'src/views')
);

/*
 * Routes
 */

app.use('/', routes);

/*
 * 404 Handler
 */

app.use((req, res) => {

    res.status(404).render('errors/404', {
        title: 'Page Not Found'
    });
});

/*
 * Global Error Handler
 */

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).render(
        'errors/500',
        {
            title: 'Server Error',
            error: err.message,
            stack: err.stack,
            NODE_ENV
        }
    );
});

/*
 * Start Server
 */

app.listen(PORT, async () => {

    try {

        await testConnection();

        console.log(
            `Server running on port ${PORT}`
        );

    } catch (error) {

        console.error(error);
    }
});