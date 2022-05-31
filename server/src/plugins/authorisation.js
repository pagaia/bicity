const { ERROR_MESSAGES } = require('../utility/constants');

module.exports = function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    // authorize based on user role
    return (req, reply, done) => {
        if (roles.length && !roles.includes(req.user.user.role)) {
            // user's role is not authorized
            reply.code(403).type('application/json').send({ message: ERROR_MESSAGES.FORBIDDEN });
        }

        // authentication and authorization successful
        done();
    };
};
