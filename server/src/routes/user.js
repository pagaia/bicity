// Import our Controllers
const userController = require('../controllers/userController');
const authorize = require('../plugins/authorisation');
const roles = require('../plugins/roles');

const userProperties = {
    _id: { type: 'string' },
    name: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    username: { type: 'string' },
    locale: { type: 'string' },
    picture: { type: 'string' },
    role: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
};

const routes = (fastify) => [
    {
        method: 'GET',
        url: '/api/users/:id',
        preHandler: [fastify.authenticate],
        handler: userController.getUserById(fastify),
        schema: {
            description: 'Get user details',
            tags: ['user'],
            summary: 'Returns user details',
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
                    properties: userProperties,
                },
                401: {
                    description: 'Authorization error',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
                404: {
                    description: 'User not found.',
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
        url: '/api/users/login',
        handler: userController.verifyUser(fastify),
        schema: {
            description: 'Login with username and password',
            tags: ['user'],
            summary: 'Login with username and password',
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                    rememberme: { type: 'boolean' },
                },
                required: ['password', 'username'],
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: userProperties,
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
    {
        method: 'POST',
        url: '/api/users/refresh-token',
        handler: userController.refreshToken(fastify),
        schema: {
            description: 'Api to refresh the user token and get a new jwt token',
            tags: ['user'],
            summary: 'Api to refresh the user token and geta new jwt token',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: userProperties,
                },
                400: {
                    description: 'Bad request.',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
                404: {
                    description: 'Token not found or expired',
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
        url: '/api/users/revoke-token',
        preHandler: [fastify.authenticate],
        handler: userController.revokeToken(fastify),
        schema: {
            description: 'Api to revoke the user token, normally when the user wants to logout',
            tags: ['user'],
            summary: 'Api to revoke the user token, normally when the user wants to logout',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Token revoked' },
                    },
                },
                400: {
                    description: 'Bad request',
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Cookie not found' },
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
        method: 'POST',
        url: '/api/users',
        // any user can create its own account
        handler: userController.addUser(fastify),
        schema: {
            description: 'Create a new user',
            tags: ['user'],
            summary: 'Create a new user',
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string' },
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['name', 'lastName', 'email', 'username'],
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: userProperties,
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
    {
        method: 'GET',
        url: '/api/users',
        preHandler: [fastify.authenticate, authorize(roles.Admin)],
        handler: userController.getUsers(fastify),
        schema: {
            description: 'Returns the list of users',
            tags: ['user'],
            summary: 'Returns the list of users',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: userProperties,
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
                authorization: [],
            },
            {
                apiKey: [],
            },
        ],
    },
    {
        method: 'PUT',
        url: '/api/users/:id',
        preHandler: [fastify.authenticate],
        handler: userController.updateUser(fastify),
        schema: {
            description: 'Update selected user',
            tags: ['user'],
            summary: 'Update selected user',
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
                    properties: userProperties,
                },
                401: {
                    description: 'Authorization error',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
                404: {
                    description: 'User not found.',
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
        url: '/api/users/:id',
        preHandler: [fastify.authenticate, authorize(roles.Admin)],
        handler: userController.deleteUser(fastify),
        schema: {
            description: 'Delete user by ID',
            tags: ['user'],
            summary: 'Delete user by ID',
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
                    description: 'User not found.',
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
