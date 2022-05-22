'use strict';

const boom = require('boom');

// Get Data Models
const Category = require('../models/category');
const CONST = require('../utility/constants');

// Get all categories
exports.getCategories = (fastify) => async (req, reply) => {
    try {
        const categories = await Category.find({});
        return categories;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get single Category by ID
exports.getCategoryById = (fastify) => async (req, reply) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (!category) {
            return fastify.notFound(req, reply);
        }
        return category;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Add a new category
exports.addCategory = (fastify) => async (req, reply) => {
    try {
        const { name, description } = req.body;

        const category = new Category({ name, description });
        const result = await category.save();

        reply.code(201).send(result);
    } catch (err) {
        if (CONST.DUPLICATE_REGEX.test(err)) {
            boom.boomify(err);
            return reply
                .code(409)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.DUPLICATE });
        }

        boom.boomify(err);
        fastify.errorHandler(err, req, reply);
    }
};
