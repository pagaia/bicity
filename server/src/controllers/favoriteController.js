'use strict';

const boom = require('boom');

// Get Data Models
const Favorite = require('../models/favorite');
const Feature = require('../models/feature');
const User = require('../models/user');
const { ERROR_MESSAGES } = require('../utility/constants');

// Get the list of favorite features per user and bbox
exports.getFavoritesFeatures = (fastify) => async (req, reply) => {
    try {
        const { userId } = req.params;

        const favorites = await Favorite.findOne({ user: userId });

        if (!favorites) {
            reply.code(404).type('application/json').send({ message: 'User Not Found' });
            return;
        }
        await favorites.populate({ path: 'features', model: 'feature' });

        return favorites.features;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get total number of favorite features per user
exports.getTotalFavorites = (fastify) => async (req, reply) => {
    try {
        const { userId } = req.params;

        const favorites = await Favorite.findOne({ user: userId });

        return { favorites: favorites?.features?.length ?? 0 };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Add favorite feature to user
exports.addFavorite = (fastify) => async (req, reply) => {
    try {
        const { featureId, userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            reply.code(404).type('application/json').send({ message: 'User Not Found' });
            return;
        }

        const feature = await Feature.findById(featureId);
        if (!feature) {
            reply.code(404).type('application/json').send({ message: 'Feature Not Found' });
            return;
        }

        let favorite = await Favorite.findOne({
            user: userId,
        });

        if (favorite) {
            // if the feature is already favorited return it and that's all
            if (favorite.features.find((f) => f.equals(featureId))) {
                await favorite.populate({ path: 'features', model: 'feature' });
                return favorite;
            }

            favorite.features.push(featureId);
            await favorite.save();
            await favorite.populate({ path: 'features', model: 'feature' });
            return favorite;
        }

        // otherwise create the favorite list with the first favority feature
        favorite = await Favorite.create({ user: userId, features: [featureId] });
        await favorite.populate({ path: 'features', model: 'feature' });

        return favorite;
    } catch (err) {
        boom.boomify(err);
        fastify.errorHandler(err, req, reply);
    }
};

// Remove favorite feature from user
exports.removeFavorite = (fastify) => async (req, reply) => {
    try {
        const { featureId, userId } = req.params;

        let favorite = await Favorite.findOne({
            user: userId,
        });

        if (!favorite) {
            reply
                .code(404)
                .type('application/json')
                .send({ message: ERROR_MESSAGES.ENTITY_NOT_FOUND });
            return;
        }

        favorite = await Favorite.updateOne(
            { user: userId },
            { $pull: { features: featureId } },
            { new: true }
        ).populate({ path: 'features', model: 'feature' });

        return favorite;
    } catch (err) {
        boom.boomify(err);
        fastify.errorHandler(err, req, reply);
    }
};
