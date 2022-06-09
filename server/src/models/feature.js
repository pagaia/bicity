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
            name: { type: String, required: true },
            url: String,
            phone: String,
            country: String,
            address: String,
            city: String,
            country: String,
            category: {
                type: String,
                validate: validateCategory,
                required: true,
            },
            capacity: Number,
            description: String,
            additionalProperties: String,
            tpl: String,
            space_for_disables: Number,
            total: Number,
            hours: String,
            rate: String,
        },
        geometry: {
            type: pointSchema,
            required: true,
            index: '2dsphere', // Create a special 2dsphere index on `device.location`
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Feature = mongoose.model('feature', featureSchema);
module.exports = Feature;
