import {
    getAllCategories as fetchAllCategories,
    getCategoryById as fetchCategoryById,
    getProjectsByCategory
} from '../models/categories.js';

/**
 * Display all categories
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

/**
 * Display a single category and its projects
 */
const getCategoryById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const category = await fetchCategoryById(id);

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