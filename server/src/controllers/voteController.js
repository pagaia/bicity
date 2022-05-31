'use strict';

const boom = require('boom');
const mongoose = require('mongoose');

// Get Data Models
const Vote = require('../models/vote');
const CONST = require('../utility/constants');

// Get the vote by user per feature
exports.getVoteByUserPerFeature = (fastify) => async (req, reply) => {
    try {
        const { featureId, userId } = req.params;

        const vote = await Vote.findOne({ user: userId, feature: featureId }).lean();
        if (!vote) {
            reply.code(404).type('application/json').send({ message: 'Not Found' });
        }
        return vote;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get number of votes per user
exports.getTotalVotesPerUser = (fastify) => async (req, reply) => {
    try {
        const { userId } = req.params;
        const votes = await Vote.count({ user: userId });
        return { votes };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get average vote per feature
// https://masteringjs.io/tutorials/mongoose/aggregate
// https://github.com/Automattic/mongoose/issues/1399
exports.getAvgVotePerFeature = (fastify) => async (req, reply) => {
    try {
        const { featureId } = req.params;

        let vote = await Vote.aggregate()
            .match({ feature: mongoose.Types.ObjectId(featureId) })
            .group({ _id: '$feature', average: { $avg: '$vote' } });

        if (!vote.length) {
            reply
                .code(404)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.ENTITY_NOT_FOUND });
        }
        vote[0].average = vote?.[0]?.average?.toFixed(1);
        return vote?.[0];
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Add vote per feature
exports.addVote = (fastify) => async (req, reply) => {
    try {
        const { featureId, userId } = req.params;
        const { vote } = req.body;

        const voteData = { feature: featureId, user: userId, vote };

        const updatedVote = await Vote.findOneAndUpdate(
            {
                feature: featureId,
                user: userId,
            },
            voteData,
            {
                new: true, // return the new information
                upsert: true, // Make this update into an upsert
            }
        ).lean();

        return updatedVote;
    } catch (err) {
        if (CONST.DUPLICATE_REGEX.test(err)) {
            return reply
                .code(409)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.DUPLICATE });
        }

        boom.boomify(err);
        fastify.errorHandler(err, req, reply);
    }
};
