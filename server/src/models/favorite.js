// External Dependancies
const mongoose = require('mongoose');

/**
 * Define favorite feature model
 */
const favoriteSchema = new mongoose.Schema(
    {
        // TODO : add like and dislike arrays
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        features: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Feature',
                required: true,
            },
        ],
    },
    { timestamps: true }
);

const Favorite = mongoose.model('favorite', favoriteSchema);
module.exports = Favorite;
