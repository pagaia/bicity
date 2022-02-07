// External Dependancies
const mongoose = require('mongoose');

/**
 * Define category model
 */
const categorySchema = new mongoose.Schema(
    {
        name: { type: 'string', unique: true, required: true },
        description: String,
    },
    { timestamps: true }
);

const Category = mongoose.model('category', categorySchema);
module.exports = Category;
