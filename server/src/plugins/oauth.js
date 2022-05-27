const User = require('../models/user');
const axios = require('axios');
const { randomTokenString, generateTokens } = require('../utility/security');
const { ONE_WEEK_MILLISECONDS, COOKIE_REFRESH_TOKEN } = require('../utility/constants');

const getGoogleUserInfo = async (access_token) => {
    const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    console.debug(data); // { id, email, given_name, family_name }
    return data;
};

const getFacebookUserInfo = async (access_token) => {
    const url = `https://graph.facebook.com/me?fields=first_name,last_name,picture,email,locale&access_token=${access_token}`;
    console.debug({ url });
    try {
        const { data } = await axios({
            url,
            method: 'GET',
        });
        console.debug(data); // { id, email, given_name, family_name }
        return {
            ...data,
            given_name: data?.first_name,
            family_name: data?.last_name,
            picture: data?.picture?.data?.url,
        };
    } catch (error) {
        console.error(error);
    }
};

module.exports = function (fastify, options, done) {
    const verifyUser = async (reply, profile, ipAddress) => {
        const email = profile.email;

        console.debug({ profile });
        // search the user in the DB with the email
        let user = await User.findOne({ email });

        // if user not found  add into the DB first
        if (!user) {
            const userData = {
                name: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                username: profile.email,
                locale: profile.locale,
                picture: profile.picture,
                accessToken: randomTokenString(),
            };
            user = new User(userData);
            user = await user.save();
        }

        const { jwtToken, refreshToken, ...userInfo } = await generateTokens(
            fastify,
            user,
            ipAddress
        );

        // send back User info, jwtToken in header, and refreshToken in the cookie
        return reply
            .header('Authorization', `Bearer ${jwtToken}`)
            .setCookie(COOKIE_REFRESH_TOKEN, refreshToken, {
                expires: new Date(Date.now() + ONE_WEEK_MILLISECONDS), // expires in 7 days
            })
            .send(userInfo);
    };

    fastify.get(
        '/api/users/verify/:provider',
        {
            schema: {
                description:
                    'Verify the Google JWT token and return a new JWT token with user information ',
                tags: ['user'],
                summary:
                    'Verify the Google JWT token and return a new JWT token with user information ',
                params: {
                    type: 'object',
                    properties: {
                        provider: { type: 'string' },
                    },
                },
                response: {
                    200: {
                        description: 'Successful token created',
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            name: { type: 'string' },
                            lastName: { type: 'string' },
                            email: { type: 'string' },
                            username: { type: 'string' },
                            locale: { type: 'string' },
                            picture: { type: 'string' },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const code = request.headers.code;
            const provider = request.params.provider;
            const ipAddress = request.ip;
            console.debug({ code, provider });
            let profile =
                provider === 'google-state-test'
                    ? await getGoogleUserInfo(code)
                    : await getFacebookUserInfo(code);

            await verifyUser(reply, profile, ipAddress);
            // get the google profile to retrive the email and check with the local one
        }
    );
    done();
};
