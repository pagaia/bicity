const fp = require('fastify-plugin');
const { ERROR_MESSAGES } = require('../utility/constants');

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
                    .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
            }
            await request.jwtVerify();
        } catch (err) {
            return reply.code(401).type('application/json').send({ message: err.message });
        }
    });
});
