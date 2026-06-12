import bcrypt from 'bcrypt';

import {
    createUser,
    authenticateUser,
    getAllUsers
} from '../models/users.js';

/*
 * Show register form
 */
const showUserRegistrationForm = (req, res) => {
    res.render('register', {
        title: 'Register',
        errors: [],
        formData: {
            name: '',
            email: ''
        }
    });
};

/*
 * Process register form
 */
const processUserRegistrationForm = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;
        const errors = [];

        if (!name || name.length < 2) errors.push('Name too short');
        if (!email) errors.push('Email required');
        if (!password || password.length < 6) errors.push('Password too short');

        if (errors.length > 0) {
            return res.render('register', {
                title: 'Register',
                errors,
                formData: { name, email }
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await createUser(name, email, passwordHash);

        res.redirect('/login');

    } catch (error) {
        next(error);
    }
};

/*
 * LOGIN
 */
const showLoginForm = (req, res) => {
    res.render('login', {
        title: 'Login',
        errors: []
    });
};

const processLoginForm = async (req, res) => {

    const { email, password } = req.body;

    const user = await authenticateUser(email, password);

    if (!user) {
        return res.render('login', {
            title: 'Login',
            errors: ['Invalid credentials']
        });
    }

    req.session.user = user;

    return res.redirect('/dashboard');
};

/*
 * LOGOUT
 */
const processLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

/*
 * DASHBOARD
 */
const showDashboard = (req, res) => {

    res.render('dashboard', {
        title: 'Dashboard',
        user: req.session.user
    });
};

/*
 * middleware
 */
const requireLogin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    next();
};

/*
 * ADMIN middleware (IMPORTANT FOR WEEK 5)
 */
const requireAdmin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    if (
        req.session.user.role_name !== 'admin'
    ) {

        return res.redirect('/dashboard');
    }

    next();
};

const showUsersPage = async (req, res) => {

    const users = await getAllUsers();

    res.render('users', {
        title: 'All Users',
        users
    });
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    requireLogin,
    requireAdmin,
    showUsersPage
};