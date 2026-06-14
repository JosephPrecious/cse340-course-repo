import bcrypt from 'bcrypt';

import {
    createUser,
    authenticateUser,
    getAllUsers
} from '../models/users.js';

import {
    getVolunteerProjects
} from '../models/volunteers.js';

import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteers.js';

/*
 * REGISTER
 */
const showUserRegistrationForm = (
    req,
    res
) => {

    res.render('register', {
        title: 'Register',
        errors: [],
        formData: {
            name: '',
            email: ''
        }
    });
};

const processUserRegistrationForm =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;

            const errors = [];

            if (
                !name ||
                name.trim().length < 2
            ) {
                errors.push(
                    'Name must be at least 2 characters.'
                );
            }

            if (!email) {
                errors.push(
                    'Email is required.'
                );
            }

            if (
                !password ||
                password.length < 6
            ) {
                errors.push(
                    'Password must be at least 6 characters.'
                );
            }

            if (
                errors.length > 0
            ) {

                return res.render(
                    'register',
                    {
                        title:
                            'Register',
                        errors,
                        formData: {
                            name,
                            email
                        }
                    }
                );
            }

            const passwordHash =
                await bcrypt.hash(
                    password,
                    10
                );

            await createUser(
                name,
                email,
                passwordHash
            );

            res.redirect(
                '/login'
            );

        } catch (error) {

            next(error);
        }
    };

/*
 * LOGIN
 */
const showLoginForm = (
    req,
    res
) => {

    res.render('login', {
        title: 'Login',
        errors: []
    });
};

const processLoginForm =
    async (
        req,
        res
    ) => {

        const {
            email,
            password
        } = req.body;

        const user =
            await authenticateUser(
                email,
                password
            );

        if (!user) {

            return res.render(
                'login',
                {
                    title:
                        'Login',
                    errors: [
                        'Invalid credentials'
                    ]
                }
            );
        }

        req.session.user =
            user;

        res.redirect(
            '/dashboard'
        );
    };

/*
 * LOGOUT
 */
const processLogout = (
    req,
    res
) => {

    req.session.destroy(() => {

        res.redirect(
            '/login'
        );
    });
};

/*
 * DASHBOARD
 */
const showDashboard =
    async (
        req,
        res,
        next
    ) => {

        try {

            const volunteerProjects =
                await getVolunteerProjects(
                    req.session.user.user_id
                );

            res.render(
                'dashboard',
                {
                    title:
                        'Dashboard',
                    user:
                        req.session.user,
                    volunteerProjects
                }
            );

        } catch (error) {

            next(error);
        }
    };

/*
 * LOGIN REQUIRED
 */
const requireLogin = (
    req,
    res,
    next
) => {

    if (
        !req.session.user
    ) {

        return res.redirect(
            '/login'
        );
    }

    next();
};

/*
 * ADMIN ONLY
 */
const requireAdmin = (
    req,
    res,
    next
) => {

    if (
        !req.session.user
    ) {

        return res.redirect(
            '/login'
        );
    }

    if (
        req.session.user.role_name !==
        'admin'
    ) {

        return res.redirect(
            '/dashboard'
        );
    }

    next();
};

/*
 * USERS PAGE
 */
const showUsersPage =
    async (
        req,
        res,
        next
    ) => {

        try {

            const users =
                await getAllUsers();

            res.render(
                'users',
                {
                    title:
                        'All Users',
                    users
                }
            );

        } catch (error) {

            next(error);
        }
    };

const volunteerForProject = async (req, res, next) => {

    try {

        const userId = req.session.user.user_id;
        const projectId = parseInt(req.params.id);

        await addVolunteer(userId, projectId);

        res.redirect('/dashboard');

    } catch (error) {
        next(error);
    }
};

const removeVolunteerFromProject = async (req, res, next) => {

    try {

        const userId = req.session.user.user_id;
        const projectId = parseInt(req.params.id);

        await removeVolunteer(userId, projectId);

        res.redirect('/dashboard');

    } catch (error) {
        next(error);
    }
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
    showUsersPage,
    volunteerForProject,
    removeVolunteerFromProject
};