// Import our Controllers
const voteController = require('../controllers/voteController');

const voteProperties = {
    _id: { type: 'string' },
    vote: { type: 'number' },
    average: { type: 'number' },
    user: { type: 'string' }, // it contains the user _id
    feature: { type: 'string' }, // it contains the feature _id
};

const routes = (fastify) => [
    {
        method: 'GET',
        url: '/api/vote/feature/:featureId',
        handler: voteController.getAvgVotePerFeature(fastify),
        schema: {
            description: 'Get average vote per feature',
            tags: ['vote'],
            summary: 'Returns the average vote per feature',
            params: {
                type: 'object',
                properties: {
                    featureId: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        average: { type: 'number' },
                    },
                },
                404: {
                    description: 'Feature not found.',
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
        url: '/api/vote/:featureId/:userId',
        // TODO add check for Admin role or owner
        preHandler: [fastify.authenticate],
        handler: voteController.getVoteByUserPerFeature(fastify),
        schema: {
            description: 'Get vote per feature per User',
            tags: ['vote'],
            summary: 'Returns the vote the user gave to the feature',
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
                    properties: voteProperties,
                },
                404: {
                    description: 'Feature or user not found',
                    type: 'object',
                    properties: { message: { type: 'string' } },
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
        url: '/api/vote/:userId/totalNumber',
        // TODO add check for Admin role or owner
        preHandler: [fastify.authenticate],
        handler: voteController.getTotalVotesPerUser(fastify),
        schema: {
            description: 'Get total number of votes per User',
            tags: ['vote'],
            summary: 'Get total number of votes per User',
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
                        votes: { type: 'number' },
                    },
                },
                404: {
                    description: 'User not found',
                    type: 'object',
                    properties: { message: { type: 'string' } },
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
        url: '/api/vote/:featureId/:userId',
        // TODO : verify logged user can update only its own votes
        preHandler: [fastify.authenticate],
        handler: voteController.addVote(fastify),
        schema: {
            description: 'Add a vote per feature by the user',
            tags: ['vote'],
            summary: 'Add a vote to the feature by the user',
            params: {
                type: 'object',
                properties: {
                    featureId: { type: 'string' },
                    userId: { type: 'string' },
                },
            },
            body: {
                type: 'object',
                properties: {
                    vote: { type: 'number' },
                },
                required: ['vote'],
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: voteProperties,
                },
                400: {
                    description: 'Bad request.',
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
