import {
    getAllCategories as fetchAllCategories,
    getCategoryById as fetchCategoryById,
    getProjectsByCategory
} from '../models/categories.js';

/*
 * GET /categories
 */
const getAllCategories = async (req, res, next) => {

    try {

        const categories = await fetchAllCategories();

        res.render('categories', {
            title: 'Service Project Categories',
            categories
        });

    } catch (error) {

        next(error);
    }
};

/*
 * GET /category/:id
 */
const getCategoryById = async (req, res, next) => {

    try {

        const id = parseInt(req.params.id, 10);

        if (!id) {
            return next();
        }

        const category = await fetchCategoryById(id);

        if (!category) {
            return next();
        }

        const projects = await getProjectsByCategory(id);

        res.render('category-details', {
            title: category.name,
            category,
            projects
        });

    } catch (error) {

        next(error);
    }
};

export {
    getAllCategories,
    getCategoryById
};