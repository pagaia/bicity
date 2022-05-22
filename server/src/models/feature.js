// External Dependancies
const mongoose = require('mongoose');
const validateCategory = require('./validation');

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const featureSchema = new mongoose.Schema(
    {
        type: String,
        properties: {
            name: 'string',
            url: 'string',
            phone: 'string',
            country: 'string',
            address: 'string',
            city: 'string',
            country: 'string',
            category: {
                type: 'string',
                validate: validateCategory,
                required: true,
            },
            capacity: Number,
            description: 'string',
            additionalProperties: 'string',
        },
        geometry: {
            type: pointSchema,
            required: true,
            index: '2dsphere', // Create a special 2dsphere index on `device.location`
        },
    },
    { timestamps: true }
);

const Feature = mongoose.model('feature', featureSchema);
module.exports = Feature;
