import {
    getAllCategories as fetchAllCategories,
    getCategoryById as fetchCategoryById,
    getProjectsByCategory,
    createCategory,
    updateCategory
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

/*
 * Render new category form
 */
const renderNewCategoryForm = (req, res) => {

    res.render('new-category', {
        title: 'Create Category',
        errors: []
    });
};

/*
 * Create category
 */
const createNewCategory = async (req, res, next) => {

    try {

        const { name } = req.body;

        const errors = [];

        if (!name || name.trim().length < 3) {
            errors.push('Category name must be at least 3 characters.');
        }

        if (name.length > 100) {
            errors.push('Category name cannot exceed 100 characters.');
        }

        if (errors.length > 0) {

            return res.render('new-category', {
                title: 'Create Category',
                errors,
                category: { name }
            });
        }

        await createCategory(name);

        res.redirect('/categories');

    } catch (error) {

        next(error);
    }
};

/*
 * Render edit category form
 */
const renderEditCategoryForm = async (req, res, next) => {

    try {

        const { id } = req.params;

        const category = await fetchCategoryById(id);

        res.render('edit-category', {
            title: 'Edit Category',
            category,
            errors: []
        });

    } catch (error) {

        next(error);
    }
};

/*
 * Update category
 */
const editCategory = async (req, res, next) => {

    try {

        const { id } = req.params;

        const { name } = req.body;

        const errors = [];

        if (!name || name.trim().length < 3) {
            errors.push('Category name must be at least 3 characters.');
        }

        if (name.length > 100) {
            errors.push('Category name cannot exceed 100 characters.');
        }

        if (errors.length > 0) {

            return res.render('edit-category', {
                title: 'Edit Category',
                errors,
                category: {
                    category_id: id,
                    name
                }
            });
        }

        await updateCategory(id, name);

        res.redirect('/categories');

    } catch (error) {

        next(error);
    }
};

export {
    getAllCategories,
    getCategoryById,
    renderNewCategoryForm,
    createNewCategory,
    renderEditCategoryForm,
    editCategory
};