const mongoose = require('mongoose');
const validateCategory = require('./validation');

const multiLineStringSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MultiLineString'],
        required: true,
    },
    coordinates: {
        type: [[[Number]]],
        required: true,
    },
});

const multiFeatureSchema = new mongoose.Schema(
    {
        type: String,
        properties: {
            category: {
                type: 'string',
                validate: validateCategory,
                required: true,
            },
            name: 'string',
            length: 'string',
            status: 'string',
        },
        geometry: {
            type: multiLineStringSchema,
            required: true,
            index: '2dsphere', // Create a special 2dsphere index on `device.location`
        },
    },
    { timestamps: true }
);

const MultiFeature = mongoose.model('multifeature', multiFeatureSchema);
module.exports = MultiFeature;
