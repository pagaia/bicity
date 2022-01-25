// External Dependancies
const boom = require("boom");

// Get Data Models
const Feature = require("../models/feature");
const CONST = require("../utility/constants");

// Get  Feature near me
exports.getFeatureNearMe = (fastify) => async (req, reply) => {
  try {
    const lat = req.query.lat || CONST.DEFAULT_LOCATION.LAT;
    const lng = req.query.lng || CONST.DEFAULT_LOCATION.LONG;

    console.log({ lat, lng });

    const feature = await Feature.find({
      geometry: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          }
        }
      }
    });
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
    const feature = new Feature(req.body);

    const result = await feature.save();

    reply.code(201).send(result);
  } catch (err) {
    if (CONST.DUPLICATE_REGEX.test(err)) {
      reply
        .code(409)
        .type("application/json")
        .send({ error: "Duplicate Object. Please check you data" });
    } else {
      throw boom.boomify(err);
    }
  }
};
