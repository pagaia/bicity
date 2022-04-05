// Import our Controllers
const featureController = require('../controllers/featureController');

const featureProperties = {
    _id: { type: 'string' },
    type: { type: 'string' },
    properties: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            url: { type: 'string' },
            phone: { type: 'string' },
            country: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            capacity: { type: 'number' },
            hours: {
                type: 'object',
                properties: {
                    start: { type: 'string' },
                    end: { type: 'string' },
                },
            },
        },
    },
    geometry: {
        type: 'object',
        properties: {
            type: { type: 'string', enum: ['Point'] },
            coordinates: {
                type: 'array',
                items: { type: 'number' },
            },
        },
    },
    updatedAt: { type: 'string' },
};

const routes = (fastify) => [
    {
        method: 'GET',
        url: '/api/feature/nearme',
        // preValidation: [fastify.authenticate],
        handler: featureController.getFeatureNearMe(fastify),
        schema: {
            description: 'Get list of feature near me around 500mt',
            tags: ['feature'],
            summary: 'Returns list of features near me in about 500mt',
            querystring: {
                lat: { type: 'number' },
                lng: { type: 'number' },
                categories: { type: 'string' },
                maxDistance: { type: 'number' },
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
                400: {
                    description: 'Invalid tag value',
                    type: 'object',
                    content: {},
                },
                401: {
                    description: 'Authorization error',
                    type: 'object',
                    content: {
                        message: 'No Authorization was found in request.headers',
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
        url: '/api/feature',
        // preValidation: [fastify.authenticate],
        handler: featureController.getAllFeatures(fastify),
        schema: {
            description: 'Get list of Features',
            tags: ['feature'],
            summary: 'Returns list of Features',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: featureProperties,
                    },
                },
                400: {
                    description: 'Invalid tag value',
                    type: 'object',
                    content: {},
                },
                401: {
                    description: 'Authorization error',
                    type: 'object',
                    content: {
                        message: 'No Authorization was found in request.headers',
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
        url: '/api/feature/:id',
        // preValidation: [fastify.authenticate],
        handler: featureController.getFeatureById(fastify),
        schema: {
            description: 'Get Feature details',
            tags: ['feature'],
            summary: 'Returns Feature details',
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
                    properties: featureProperties,
                },
                400: {
                    description: 'Invalid tag value',
                    type: 'object',
                    content: {},
                },
                401: {
                    description: 'Authorization error',
                    type: 'object',
                    content: {
                        message: 'No Authorization was found in request.headers',
                    },
                },
                404: {
                    description: 'Feature not found',
                    type: 'object',
                    content: {
                        message: "The feature is not here. It's around riding a bike :)",
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
        url: '/api/feature',
        preValidation: [fastify.authenticate],
        handler: featureController.addFeature(fastify),
        schema: {
            description: 'Create a new feature',
            tags: ['feature'],
            summary: 'Add a new feature to the list',
            body: {
                type: 'object',
                properties: featureProperties,
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: featureProperties,
                },

                default: {
                    description: 'Unexpected error',
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
