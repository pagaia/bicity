// Import our Controllers
const multiFeatureController = require('../controllers/multiFeatureController');

const multiFeatureProperties = {
    _id: { type: 'string' },
    type: { type: 'string' },
    properties: {
        type: 'object',
        properties: {
            sede: { type: 'string' },
            name: { type: 'string' },
            length: { type: 'string' },
            status: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
        },
    },
    geometry: {
        type: 'object',
        properties: {
            type: { type: 'string', enum: ['MultiLineString'] },
            coordinates: {
                type: 'array',
                items: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: { type: 'number' },
                    },
                },
            },
        },
    },
    updatedAt: { type: 'string' },
};

const routes = (fastify) => [
    {
        method: 'GET',
        url: '/api/multifeature',
        handler: multiFeatureController.getMultiFeatures(fastify),
        schema: {
            description: 'Get multi features in the provided bounding box',
            tags: ['multifeature'],
            summary: 'Get multi features in the provided bounding box',
            querystring: {
                nlat: { type: 'number' },
                nlng: { type: 'number' },
                slat: { type: 'number' },
                slng: { type: 'number' },
                category: { type: 'string' },
                maxDistance: { type: 'number' },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: multiFeatureProperties,
                    },
                },
                400: {
                    description: 'Invalid tag value',
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

    {
        method: 'GET',
        url: '/api/multifeature/:id',
        handler: multiFeatureController.getMultiFeatureById(fastify),
        schema: {
            description: 'Get Multi Feature details',
            tags: ['multifeature'],
            summary: 'Returns Multi Feature details',
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
                    properties: multiFeatureProperties,
                },
                400: {
                    description: 'Invalid tag value',
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
                404: {
                    description: 'Feature not found',
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
        url: '/api/multifeature',
        preHandler: [fastify.authenticate],
        handler: multiFeatureController.addMultiFeature(fastify),
        schema: {
            description: 'Create a new multi feature',
            tags: ['multifeature'],
            summary: 'Add a new multi feature to the list',
            body: {
                type: 'object',
                properties: multiFeatureProperties,
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: multiFeatureProperties,
                },

                default: {
                    description: 'Unexpected error',
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
