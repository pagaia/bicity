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
            additionalProperties: { type: 'string' },
            tpl: { type: 'string' },
            space_for_disables: { type: 'number' },
            total: { type: 'number' },
            hours: { type: 'string' },
            rate: { type: 'string' },
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
        url: '/api/feature/bbox',
        handler: featureController.getFeaturesByBox(fastify),
        schema: {
            description:
                'Get list of features in the bbox made by the up-left and bottom-right points',
            tags: ['feature'],
            summary: 'Get list of features in the bbox made by the up-left and bottom-right points',
            querystring: {
                nlat: { type: 'number' },
                nlng: { type: 'number' },
                slat: { type: 'number' },
                slng: { type: 'number' },
                category: { type: 'string' },
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
    // {
    //     method: 'GET',
    //     url: '/api/feature',
    //     preHandler: [fastify.authenticate, authorize(roles.Admin)],
    //     handler: featureController.getAllFeatures(fastify),
    //     schema: {
    //         description: 'Get list of Features',
    //         tags: ['feature'],
    //         summary: 'Returns list of Features',
    //         response: {
    //             200: {
    //                 description: 'Successful response',
    //                 type: 'array',
    //                 items: {
    //                     type: 'object',
    //                     properties: featureProperties,
    //                 },
    //             },
    //             400: {
    //                 description: 'Invalid tag value',
    //                 type: 'object',
    //                 properties: {
    //                     message: { type: 'string' },
    //                 },
    //             },
    //         },
    //     },
    //     security: [
    //         {
    //             apiKey: [],
    //         },
    //     ],
    // },
    {
        method: 'GET',
        url: '/api/feature/:id',
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
        url: '/api/feature',
        preHandler: [fastify.authenticate],
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
        url: '/api/feature/:userId/totalNumber',
        // check owner or ADMIN
        preHandler: [fastify.authenticate],
        handler: featureController.getTotalFeatureCreated(fastify),
        schema: {
            description: 'Get total number of features created by given user',
            tags: ['favorite'],
            summary: 'Returns total number of features created by given user',
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
                        features: { type: 'number' },
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
];

module.exports = {
    routes,
    featureProperties,
};
