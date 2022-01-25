const fp = require("fastify-plugin");
const config = require("../config/config");

module.exports = fp(async function (fastify, opts) {
  

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      console.log({ auth: request?.headers });
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send(err);
    }
  });
});
