const bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../models/user');
const crypto = require('crypto');
const RefreshToken = require('../models/refresh-token');
const { ONE_WEEK_MILLISECONDS } = require('./constants');

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

/**
 * This helper function gets the user object and the ip address and return the clean user information, the jwtToken and refreshToken
 * @param {User} user - user authenticated
 * @param {String} ipAddress  - ip address of the user's machine from which the user authenticated
 * @returns
 */
const generateTokens = async (fastify, user, ipAddress) => {
    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(fastify, user);
    const refreshToken = generateRefreshToken(user, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(user),
        jwtToken,
        refreshToken: refreshToken.token,
    };
};

function generateJwtToken(fastify, user) {
    // create a jwt token containing the user id that expires in 30 minutes
    return fastify.jwt.sign({ user: basicDetails(user) }, { expiresIn: '30m' });
}

function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new RefreshToken({
        user: user._id,
        token: randomTokenString(),
        expires: new Date(Date.now() + ONE_WEEK_MILLISECONDS),
        createdByIp: ipAddress,
    });
}

function randomTokenString() {
    return crypto.randomBytes(45).toString('hex').toUpperCase();
}

function basicDetails(user) {
    const { _id, name, lastName, username, role, locale, picture, email } = user;
    return { _id, name, lastName, username, role, locale, picture, email };
}

async function getRefreshToken(token) {
    const refreshToken = await RefreshToken.findOne({ token }).populate('user');
    if (!refreshToken || !refreshToken.isActive) throw new Error('Invalid token');
    return refreshToken;
}

async function refreshToken({ fastify, token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
    const { user } = refreshToken;

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(fastify, user);

    // return basic details and tokens
    return {
        ...basicDetails(user),
        jwtToken,
        refreshToken: newRefreshToken.token,
    };
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

module.exports = {
    validateToken,
    encryptPassword,
    randomTokenString,
    generateTokens,
    refreshToken,
    revokeToken,
};
