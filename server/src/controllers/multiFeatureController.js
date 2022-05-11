// External Dependancies
const boom = require('boom');

// Get Data Models
const MultiFeature = require('../models/multi-feature');
const CONST = require('../utility/constants');

// Get  MultiFeature by bbox
exports.getMultiFeatures = (fastify) => async (req, reply) => {
    try {
        const { nlat, nlng, slat, slng } = req.query;

        const category = req.query.category;

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
        if (category) {
            payload.properties = { category };
        }

        const multiFeature = await MultiFeature.find(payload);

        return multiFeature;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get  Multi Feature by Id
exports.getMultiFeatureById = (fastify) => async (req, reply) => {
    try {
        const id = req.params.id;
        const feature = await MultiFeature.findById(id);
        if (!feature) {
            return fastify.notFound(req, reply);
        }
        return feature;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Add a new multi feature
exports.addMultiFeature = (fastify) => async (req, reply) => {
    try {
        const feature = new MultiFeature(req.body);

        const result = await feature.save();

        reply.code(201).send(result);
    } catch (err) {
        if (CONST.DUPLICATE_REGEX.test(err)) {
            reply
                .code(409)
                .type('application/json')
                .send({ error: 'Duplicate Object. Please check you data' });
        } else {
            throw boom.boomify(err);
        }
    }
};
