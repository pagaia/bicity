const fp = require("fastify-plugin");
// const config = require("../config/config");

const LOCALHOST_REGEX = new RegExp("localhost");

module.exports = fp(async function (fastify, opts) {
  console.log({opts})
  fastify.register(require("fastify-jwt"), {
    secret: opts.config.jwt.secret
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      console.log({ auth: request?.headers });
      // check the token only if the host is different from localhost
      // if (!LOCALHOST_REGEX.test(request?.headers?.host)) {
        console.log("OPS!!!");
        await request.jwtVerify();
      // }
    } catch (err) {
      reply.code(401).send(err);
    }
  });
});
