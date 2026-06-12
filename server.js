import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import flash from 'connect-flash';

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
 * Session Configuration
 */

app.use(
    session({
        secret: 'cse340-secret-key',
        resave: false,
        saveUninitialized: false
    })
);

app.use(flash());

/*
 * Middleware
 */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'src/views'));

/*
 * Global View Variables
 */

app.use((req, res, next) => {

    res.locals.isLoggedIn = false;

    if (
        req.session &&
        req.session.user
    ) {

        res.locals.isLoggedIn = true;
    }

    res.locals.successMessages =
        req.flash('success');

    res.locals.errorMessages =
        req.flash('error');

    res.locals.NODE_ENV =
        NODE_ENV;

    next();
});

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
  n*/

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