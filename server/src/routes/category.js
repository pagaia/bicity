// Import our Controllers
const categoryController = require('../controllers/categoryController');

const categoryProperties = {
    _id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
};

const routes = (fastify) => [
    {
        method: 'GET',
        url: '/api/categories/',
        // preValidation: [fastify.authenticate],
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
                404: {
                    description: 'Feature not found.',
                    type: 'object',
                    content: { message: 'Feature not found or vote not available' },
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
        url: '/api/categories/:categoryId',
        // preValidation: [fastify.authenticate],
        handler: categoryController.getCategortById(fastify),
        schema: {
            description: 'Get details of category',
            tags: ['category'],
            summary: 'Returns the category details',
            params: {
                type: 'object',
                properties: {
                    categoryId: { type: 'string' },
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
                    content: { message: 'Category not found' },
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
        // preValidation: [fastify.authenticate],
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
                    content: {},
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
