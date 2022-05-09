// External Dependancies
const mongoose = require('mongoose');
const { MAX_VOTE_FEATURE } = require('../utility/constants');

/**
 * validate  vote added
 */
const validateVote = (vote) => {
    return vote >= 0 && vote <= MAX_VOTE_FEATURE;
};

/**
 * Define vote model
 */
const voteSchema = new mongoose.Schema(
    {
        // TODO : add average in the DB when adding the vote
        vote: { type: 'number', required: true, validate: validateVote, default: 0 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        feature: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feature',
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

const Vote = mongoose.model('vote', voteSchema);
module.exports = Vote;
