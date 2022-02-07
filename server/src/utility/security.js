const bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../models/user');

const createToken = () => {
    //create a base-36 string that is always 45 chars long a-z0-9 in upper case
    // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
    const apiKey = [...Array(45)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('')
        .toUpperCase();

    return apiKey;
};

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt, null);

        return hash;
    } catch (err) {
        Boom.boomify(err);
        throw err;
    }
};

const validateToken = async (req, reply, done) => {
    let tokenHost = req.headers.origin;
    let userId = req.params.id;
    let api_key = req.headers['x-api-token']; //version 3 using a header
    console.log({ headers: req.headers });
    console.log({ tokenHost, deviceId, api_key });

    try {
        const user = await User.findOne({
            _id: userId,
        }).exec();

        if (!user) {
            return reply.code(404).type('application/json').send({ error: 'Not Found' });
        }

        const isMatch = await user.compareToken(api_key);

        // check only the token without matching the host
        if (isMatch) {
            console.log('API key match');
            console.log('tokenHost match');
        } else {
            //reply.code(401).send({ error: "Unauthorized" });
            done({ error: 'Unauthorized' });
            return;
        }
        console.log({ isMatch });
        console.log({ userToken: user.tokenHost, tokenHost });
        // no error should be returned is fine then
        done();
    } catch (err) {
        Boom.boomify(err);
        throw err;
    }
};

module.exports = { createToken, validateToken, encryptPassword };
