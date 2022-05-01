const fp = require('fastify-plugin');
const { ERROR_MESSAGES } = require('../utility/constants');

const LOCALHOST_REGEX = new RegExp('localhost');

module.exports = fp(async function (fastify, opts) {

    fastify.register(require('fastify-jwt'), {
        secret: opts.config.jwt.secret,
    });

    fastify.decorate('authenticate', async function (request, reply) {
        try {
            if (!request.headers?.authorization) {
                return reply
                    .code(401)
                    .type('application/json')
                    .send({ error: ERROR_MESSAGES.UNAUTHORIZED });
            }
            await request.jwtVerify();
        } catch (err) {
            return reply.code(401).type('application/json').send({ error: err.message });
        }
    });
});
