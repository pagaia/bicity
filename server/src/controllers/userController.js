'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt');

// Get Data Models
const User = require('../models/user');
const CONST = require('../utility/constants');
const { encryptPassword, createToken } = require('../utility/security');

// Get all users
exports.getUsers = (fastify) => async (req, reply) => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get single User by ID
exports.getUserById = (fastify) => async (req, reply) => {
    try {
        const id = req.params.id;
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
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return fastify.notFound(req, reply);
        }
        console.log({ password, user });
        const isMatch = bcrypt.compareSync(password, user.passwordHash);

        // const isMatch = await user.verifyPassword(password);

        if (isMatch) {
            console.log('password match');
        } else {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }
        const token = fastify.jwt.sign({ user }, { expiresIn: '30m' });
        reply.header('Authorization', `Bearer ${token}`).send(user);
    } catch (err) {
        throw boom.boomify(err);
    }
};
// Add a new user
exports.addUser = (fastify) => async (req, reply) => {
    try {
        const { name, lastName, password, email, username } = req.body;
        const passwordHash = await encryptPassword(password);
        const data = {
            name,
            lastName,
            password,
            email,
            username,
            passwordHash,
            accessToken: createToken(),
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
                .send({ error: 'Duplicate Object. Please check you data' });
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
                .send({ error: 'Duplicate Object. Please check you data' });
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
