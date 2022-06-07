'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt');

// Get Data Models
const User = require('../models/user');
const CONST = require('../utility/constants');
const security = require('../utility/security');
const roles = require('../plugins/roles');

// Get all users
exports.getUsers = (fastify) => async (req, reply) => {
    try {
        const users = await User.find({});
        return users;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get single User by ID
exports.getUserById = (fastify) => async (req, reply) => {
    try {
        const id = req.params.id;
        // if not user or not Admin return an error
        if (id !== req.user.user._id && req.user.user.role !== roles.Admin) {
            return reply
                .code(403)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.FORBIDDEN });
        }
        const user = await User.findById(id);
        if (!user) {
            return fastify.notFound(req, reply);
        }
        return user;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Verify User Login
exports.verifyUser = (fastify) => async (req, reply) => {
    try {
        const { username, password, rememberme } = req.body;
        const user = await User.findOne({ username });

        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            return reply.code(401).send({ message: 'Username or password is incorrect' });
        }

        const { jwtToken, refreshToken, ...userInfo } = await security.generateTokens(
            fastify,
            user,
            req.ip
        );

        // send back User info, jwtToken in header, and refreshToken in the cookie if rememberme is selected
        if (rememberme) {
            return reply
                .header('Authorization', `Bearer ${jwtToken}`)
                .setCookie(CONST.COOKIE_REFRESH_TOKEN, refreshToken, {
                    expires: new Date(Date.now() + CONST.ONE_WEEK_MILLISECONDS), // expires in 7 days
                })
                .send(userInfo);
        }

        // send back authorisation only without cookie
        return reply.header('Authorization', `Bearer ${jwtToken}`).send(userInfo);
    } catch (err) {
        throw boom.boomify(err);
    }
};

// verify refresh token and refresh access token and refreshToken
exports.refreshToken = (fastify) => async (req, reply) => {
    try {
        if (!req.cookies[CONST.COOKIE_REFRESH_TOKEN]) {
            return reply.code(400).send({ message: CONST.ERROR_MESSAGES.COOKIE_TOKEN_MISSING });
        }
        const result = reply.unsignCookie(req.cookies[CONST.COOKIE_REFRESH_TOKEN]);

        if (!result.valid) {
            return reply.code(400).send({ message: CONST.ERROR_MESSAGES.COOKIE_TOKEN_INVALID });
        }
        const token = result.value;

        const { jwtToken, refreshToken, ...userInfo } = await security.refreshToken({
            fastify,
            token,
            ipAddress: req.ip,
        });

        // send back User info, jwtToken in header, and refreshToken in the cookie
        return reply
            .header('Authorization', `Bearer ${jwtToken}`)
            .setCookie(CONST.COOKIE_REFRESH_TOKEN, refreshToken, {
                expires: new Date(Date.now() + CONST.ONE_WEEK_MILLISECONDS), // expires in 7 days
            })
            .send(userInfo);
    } catch (err) {
        if (err?.message === 'Invalid token') {
            return reply.code(401).send({ message: 'Token not valid! Please login again' });
        }
        throw boom.boomify(err);
    }
};

// revoke Token - normally when the user wants to log out from the app
exports.revokeToken = (fastify) => async (req, reply) => {
    try {
        // cookie is missing
        if (!req.cookies[CONST.COOKIE_REFRESH_TOKEN]) {
            return reply.code(400).send({ message: CONST.ERROR_MESSAGES.COOKIE_TOKEN_MISSING });
        }

        const result = reply.unsignCookie(req.cookies[CONST.COOKIE_REFRESH_TOKEN]);

        if (!result.valid) {
            return reply.code(400).send({ message: CONST.ERROR_MESSAGES.COOKIE_TOKEN_INVALID });
        }
        const token = result.value;

        await security.revokeToken({
            token,
            ipAddress: req.ip,
        });

        // token revoke
        return reply.send({ message: 'Token revoked' });
    } catch (err) {
        console.debug(err);
        throw boom.boomify(err);
    }
};

// Add a new user
exports.addUser = (fastify) => async (req, reply) => {
    try {
        const { name, lastName, password, email, username } = req.body;
        const passwordHash = await security.encryptPassword(password);
        const data = {
            name,
            lastName,
            password,
            email,
            username,
            passwordHash,
            accessToken: security.randomTokenString(),
            picture: `https://api.multiavatar.com/${name} ${lastName}.png`,
        };

        const user = new User(data);
        const result = await user.save();

        reply.code(201).send(result);
    } catch (err) {
        if (CONST.DUPLICATE_REGEX.test(err)) {
            boom.boomify(err);
            return reply
                .code(409)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.DUPLICATE });
        }

        boom.boomify(err);
        fastify.errorHandler(err, req, reply);
    }
};

// Update an existing user
exports.updateUser = (fastify) => async (req, reply) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const foundUser = User.findById(userId);
        if (!foundUser) {
            return fastify.notFound(req, reply);
        }
        // if you are here you are Admin or owner
        // check if you are the owner

        if (req.user.user.role !== roles.Admin && foundUser._id !== req.user.user._id) {
            return reply
                .code(403)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.FORBIDDEN });
        }
        const updatedUser = await User.findOneAndUpdate(userId, updateData, {
            new: true,
        });

        return updatedUser;
    } catch (err) {
        if (CONST.DUPLICATE_REGEX.test(err)) {
            boom.boomify(err);
            return reply
                .code(409)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.DUPLICATE });
        }
        boom.boomify(err);
        fastify.errorHandler(err, req, reply);
    }
};

// Delete a user
exports.deleteUser = (fastify) => async (req, reply) => {
    try {
        const userId = req.params.id;
        const userFound = await User.findByIdAndRemove(userId);
        if (!userFound) {
            return fastify.notFound(req, reply);
        }
        reply.send(200);
    } catch (err) {
        boom.boomify(err);
        return fastify.notFound(req, reply);
    }
};
