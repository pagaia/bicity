exports.DUPLICATE_REGEX = new RegExp('E11000 duplicate key error collection');

exports.DEFAULT_LOCATION = {
    // LAT: 41.883446,
    LAT: 50.834852,
    // LONG: 12.475011
    LONG: 2.993482,
};

exports.MAX_VOTE_FEATURE = 5;

exports.ONE_WEEK_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

exports.COOKIE_REFRESH_TOKEN = '__Host-refreshToken';

exports.ERROR_MESSAGES = {
    UNAUTHORIZED: 'No Authorization was found in request.headers',
    TOKEN_INVALID: 'Authorization token is invalid: invalid token',
    TOKEN_EXPIRED: 'Authorization token expired',
    FORBIDDEN: 'You are not allowed to access this information',
    COOKIE_TOKEN_MISSING: 'The cookie token is missing',
    COOKIE_TOKEN_INVALID: 'The cookie token is invalid',
    ENTITY_NOT_FOUND: "The entity is not here. It's around riding a bike :)",
    DUPLICATE: 'Duplicate Object. You have two wheels equal. Please check you data',
};
