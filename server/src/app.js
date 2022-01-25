const featureRoutes = require("./routes/feature");
const userRoutes = require("./routes/user");
const config = require("./config/config");

// Import Swagger Options
const swagger = require("./config/swagger");
const { validateToken } = require("./utility/security");

function build(opts = {}) {
  // Require the framework and instantiate it
  const fastify = require("fastify")(opts);

  // add CORS feature
  fastify.register(require("fastify-cors"), {
    // put your options here
    origin: "http://localhost:3000"
  });

  // Register Swagger
  fastify.register(require("fastify-swagger"), swagger.options);

  fastify.decorate("notFound", (request, reply) => {
    reply.code(404).type("application/json").send({ error: "Not Found" });
  });

  fastify.setNotFoundHandler(fastify.notFound);

  // plugin to verify user and create JWT
  fastify.register(require("./plugins/googleAuth"), {});

  // plugin to verify JWT
  fastify.register(require("./plugins/authenticate"), {});

  fastify.decorate("validateToken", validateToken);

  fastify.register(require("fastify-auth")).after(routes);

  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(500).send({ error: "Server Error", message: error });
  });

  // function to declare all routes at the end after registration
  function routes() {
    // Declare a route
    fastify.get("/", async (request, reply) => {
      return {
        message:
          "Hello, welcome to BiCity, the bikers platform for locale information"
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
  }

  return fastify;
}

module.exports = build;
