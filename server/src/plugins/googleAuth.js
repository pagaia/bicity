const User = require("../models/user");
const axios = require("axios");

const getGoogleUserInfo = async (access_token) => {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(data); // { id, email, given_name, family_name }
  return data;
};

module.exports = function (fastify, options, done) {
  const verifyUser = async (reply, profile) => {
    const email = profile.email;

    // search the user in the DB with the email
    const user = await User.findOne({ email });

    // if user not found return 401 unauthorized
    if (!user) {
      reply.code(401).type("application/json").send({ error: "Not Found" });
      return;
    }

    // otherwise generate a JWT with the profile inside and return to the Client
    const token = fastify.jwt.sign({ profile }, { expiresIn: "30m" });
    reply.header("Authorization", `Bearer ${token}`).send(profile);
  };

  fastify.get(
    "/api/users/verify",
    {
      schema: {
        description:
          "Verify the Google JWT token and return a new JWT token with user information ",
        tags: ["users"],
        summary:
          "Verify the Google JWT token and return a new JWT token with user information ",
        response: {
          200: {
            description: "Successful token created",
            type: "object",
            properties: {
              email: { type: "string" },
              family_name: { type: "string" },
              given_name: { type: "string" },
              locale: { type: "string" },
              name: { type: "string" },
              picture: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const code = request.headers.code;
      console.log({ code });
      const profile = await getGoogleUserInfo(code);
      await verifyUser(reply, profile);
      // get the google profile to retrive the email and check with the local one
    }
  );
  done();
};
