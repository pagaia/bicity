// Import our Controllers
const categoryController = require('../controllers/categoryController');
const { ERROR_MESSAGES } = require('../utility/constants');

const categoryProperties = {
    _id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
};

const routes = (fastify) => [
    {
        method: 'GET',
        url: '/api/categories',
        handler: categoryController.getCategories(fastify),
        schema: {
            description: 'Get all category list',
            tags: ['category'],
            summary: 'Returns all categories of the features',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: categoryProperties,
                    },
                },
            },
        },
        security: [
            {
                apiKey: [],
            },
        ],
    },
    {
        method: 'GET',
        url: '/api/categories/:id',
        handler: categoryController.getCategoryById(fastify),
        schema: {
            description: 'Get details of category',
            tags: ['category'],
            summary: 'Returns the category details',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: categoryProperties,
                },
                404: {
                    description: 'Category  not found',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
        security: [
            {
                apiKey: [],
            },
        ],
    },
    {
        method: 'POST',
        url: '/api/categories',
        preHandler: [fastify.authenticate],
        handler: categoryController.addCategory(fastify),
        schema: {
            description: 'Add a new category',
            tags: ['category'],
            summary: 'Add a new category',

            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: categoryProperties,
                },
                400: {
                    description: 'Bad request.',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
                401: {
                    description: 'Authorization error',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
        security: [
            {
                apiKey: [],
            },
        ],
    },
];

module.exports = routes;
