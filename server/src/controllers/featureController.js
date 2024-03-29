// External Dependancies
const boom = require('boom');

// Get Data Models
const Feature = require('../models/feature');
const CONST = require('../utility/constants');

// Get  Feature near me
exports.getFeatureNearMe = (fastify) => async (req, reply) => {
    try {
        const lat = req.query.lat || CONST.DEFAULT_LOCATION.LAT;
        const lng = req.query.lng || CONST.DEFAULT_LOCATION.LONG;
        const categories = req.query.categories?.split(',');
        const maxDistance = req.query.maxDistance || 1000;

        let payload = {
            geometry: {
                $near: {
                    $maxDistance: maxDistance,
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat],
                    },
                },
            },
        };
        if (categories) {
            payload['properties.category'] = { $in: categories };
        }

        const feature = await Feature.find(payload);
        return feature;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get Feature by bbox
exports.getFeaturesByBox = (fastify) => async (req, reply) => {
    try {
        const { nlat, nlng, slat, slng } = req.query;

        const categories = req.query.categories?.split(',');

        let payload = {
            geometry: {
                $geoWithin: {
                    $geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [slng, slat],
                                [nlng, slat],
                                [nlng, nlat],
                                [slng, nlat],
                                [slng, slat],
                            ],
                        ],
                    },
                },
            },
        };

        // TODO to be fixed to return all features when no categories is provided
        // if (!categories?.length) {
        if (categories) {
            payload['properties.category'] = { $in: categories };
        }
        const feature = await Feature.find(payload);
        return feature;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get  Feature by Id
exports.getFeatureById = (fastify) => async (req, reply) => {
    try {
        const id = req.params.id;
        const feature = await Feature.findById(id);
        if (!feature) {
            return fastify.notFound(req, reply);
        }
        return feature;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get all Feature in the DB
exports.getAllFeatures = (fastify) => async (req, reply) => {
    try {
        const features = await Feature.find();
        return features;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Add a new feature
exports.addFeature = (fastify) => async (req, reply) => {
    try {
        const payload = { ...req.body, updatedBy: req.user.user._id };
        const feature = new Feature(payload);
        const result = await feature.save();

        reply.code(201).send(result);
    } catch (err) {
        if (CONST.DUPLICATE_REGEX.test(err)) {
            reply
                .code(409)
                .type('application/json')
                .send({ message: CONST.ERROR_MESSAGES.DUPLICATE });
        } else {
            throw boom.boomify(err);
        }
    }
};

exports.getTotalFeatureCreated = (fastify) => async (req, reply) => {
    try {
        const { userId } = req.params;

        const features = await Feature.countDocuments({ updatedBy: userId });

        return { features };
    } catch (err) {
        throw boom.boomify(err);
    }
};
