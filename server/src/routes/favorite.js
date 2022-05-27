// Import our Controllers
const favoriteController = require('../controllers/favoriteController');
const { ERROR_MESSAGES } = require('../utility/constants');
const { featureProperties } = require('./feature');

const favoriteProperties = {
    _id: { type: 'string' },
    user: { type: 'string' }, // it contains the user _id
    features: {
        type: 'array',
        items: { type: 'object', properties: featureProperties },
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
};

const routes = (fastify) => [
    {
        method: 'GET',
        url: '/api/favorite/:userId',
        preHandler: [fastify.authenticate],
        handler: favoriteController.getFavoritesFeatures(fastify),
        schema: {
            description: 'Get list of favorite features per given user',
            tags: ['favorite'],
            summary: 'Returns list of favorite features per given user',
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: featureProperties,
                    },
                },
                404: {
                    description: 'User not found.',
                    type: 'object',
                    properties: { message: { type: 'string' } },
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
    {
        method: 'GET',
        url: '/api/favorite/:userId/totalNumber',
        preHandler: [fastify.authenticate],
        handler: favoriteController.getTotalFavorites(fastify),
        schema: {
            description: 'Get total number of favorite features per given user',
            tags: ['favorite'],
            summary: 'Returns total number of favorite features per given user',
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        favorites: { type: 'number' },
                    },
                },
                404: {
                    description: 'User not found.',
                    type: 'object',
                    properties: { message: { type: 'string' } },
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
    {
        method: 'POST',
        url: '/api/favorite/:userId/:featureId',
        preHandler: [fastify.authenticate],
        handler: favoriteController.addFavorite(fastify),
        schema: {
            description: 'Add a given feature as favorite for the given user',
            tags: ['favorite'],
            summary: 'Add a given feature as favorite for the given user',
            params: {
                type: 'object',
                properties: {
                    featureId: { type: 'string' },
                    userId: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: favoriteProperties,
                },
                404: {
                    description: 'User or Feature not found',
                    type: 'object',
                    properties: { message: { type: 'string' } },
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
    {
        method: 'DELETE',
        url: '/api/favorite/:userId/:featureId',
        preHandler: [fastify.authenticate],
        handler: favoriteController.removeFavorite(fastify),
        schema: {
            description: 'Remove a given feature as favorite for the given user',
            tags: ['favorite'],
            summary: 'Remove a given feature as favorite for the given user',
            params: {
                type: 'object',
                properties: {
                    featureId: { type: 'string' },
                    userId: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: favoriteProperties,
                },
                404: {
                    description: 'User or Feature not found.',
                    type: 'object',
                    properties: { message: { type: 'string' } },
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
