'use strict';

const { format, utcToZonedTime } = require('date-fns-tz');
const boom = require('boom');

/**
 * Compare 2 object based on created_at property
 * @param {feed} a
 * @param {feed} b
 * @returns
 */
exports.compareCreatedAt = (a, b) => {
    if (a.created_at < b.created_at) {
        return -1;
    }
    if (a.created_at > b.created_at) {
        return 1;
    }
    return 0;
};

/**
 *  format the date in the reauested time zone
 * @param {Date} date the date to convert
 * @param {String} tzString The Tilme zone "Europe/rome"
 * @returns {String}
 */
exports.formatTimeZone = (date, tzString) => {
    // console.log({ date, tzString });
    if (!date) {
        return null;
    }
    return format(utcToZonedTime(date, tzString), 'yyyy-MM-dd HH:mm:ssXXX', {
        timeZone: tzString,
    });
};

exports.getLastDayPreviousMonth = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);
};

// generate JWT temporary token per selected user
exports.generateJWT = (fastify) => async (req, reply) => {
    try {
        const token = fastify.jwt.sign({ message: 'Welcome' }, { expiresIn: '15m' });
        console.log({ token });
        return reply.send({ token });
    } catch (err) {
        throw boom.boomify(err);
    }
};
