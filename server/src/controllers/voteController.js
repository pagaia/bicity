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

        // console.log({ featureId, userId });
        const vote = await Vote.findOne({ user: userId, feature: featureId });
        if (!vote) {
            reply.code(404).type('application/json').send({ error: 'Not Found' });
        }
        return vote;
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
        console.log({ featureId });

        let vote = await Vote.aggregate()
            .match({ feature: mongoose.Types.ObjectId(featureId) })
            .group({ _id: '$feature', average: { $avg: '$vote' } });
        // let vote = await Vote.aggregate([
        //     { $match: { feature: mongoose.Types.ObjectId(featureId) } },
        //     {
        //         $group: { _id: '$feature', average: { $avg: '$vote' } },
        //     },
        // ]);
        if (!vote.length) {
            reply.code(404).type('application/json').send({ error: 'Not Found' });
        }
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
        // console.log({ voteData });

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
        );

        // console.log({ updatedVote });

        return updatedVote;
    } catch (err) {
        if (CONST.DUPLICATE_REGEX.test(err)) {
            return reply
                .code(409)
                .type('application/json')
                .send({ error: 'Duplicate Object. Please check you data' });
        }

        boom.boomify(err);
        fastify.errorHandler(err, req, reply);
    }
};
