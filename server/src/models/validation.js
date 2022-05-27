const Category = require('./category');

/**
 * validate function to check that the category inserted is already defined in the Category collection
 */
const validateCategory = async (name) => {
    // console.debug({ name });
    const found = !!(await Category.findOne({
        name,
        // deleted: false // in case I want to delete a category, I set it as deleted
    }));
    // console.debug({ found });
    return found;
};

module.exports = validateCategory;
