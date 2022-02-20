'use strict';

const featureRoutes = require('./routes/feature');
const userRoutes = require('./routes/user');
const voteRoutes = require('./routes/vote');
const categoryRoutes = require('./routes/category');

// Import Swagger Options
const swagger = require('./config/swagger');
const { validateToken } = require('./utility/security');

function build(opts = {}) {
    // Require the framework and instantiate it
    const fastify = require('fastify')(opts);

    // add CORS feature
    // fastify.register(require('fastify-cors'), {
    //     // put your options here
    //     origin: 'http://localhost:3000',
    // });

    // register cookie plugin
    fastify.register(require('fastify-cookie'), {
        secret: opts.config.cookie.secret, // for cookies signature
        parseOptions: {
            sameSite: true,
            path: '/',
            httpOnly: true,
            secure: true,
            signed: true
        }, // options for parsing cookies
    });

    // Register Swagger
    fastify.register(require('fastify-swagger'), swagger.options);

    fastify.decorate('notFound', (request, reply) => {
        reply.code(404).type('application/json').send({ error: 'Not Found' });
    });

    fastify.setNotFoundHandler(fastify.notFound);

    // plugin to verify user and create JWT
    fastify.register(require('./plugins/oauth'), {});

    // plugin to verify JWT
    fastify.register(require('./plugins/authenticate'), opts);

    // validate user token
    fastify.decorate('validateToken', validateToken);

    fastify.register(require('fastify-auth')).after(routes);

    fastify.setErrorHandler(function (error, request, reply) {
        // Log error
        this.log.error(error);
        // Send error response
        reply.status(500).send({ error: 'Server Error', message: error });
    });

    // function to declare all routes at the end after registration
    function routes() {
        // Declare a route
        fastify.get('/', async (request, reply) => {
            return {
                message: 'Hello, welcome to BiCity, the bikers platform for locale information',
            };
        });

        // Configure routes for Feature
        featureRoutes(fastify).forEach((route, index) => {
            fastify.route(route);
        });

        // Configure routes for Users
        userRoutes(fastify).forEach((route, index) => {
            fastify.route(route);
        });

        // add routed per vote
        voteRoutes(fastify).forEach((route, index) => {
            fastify.route(route);
        });

        categoryRoutes(fastify).forEach((route, index) => {
            fastify.route(route);
        });
    }

    return fastify;
}

module.exports = build;
