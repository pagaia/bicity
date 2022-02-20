const config = {
    db: {
        url: process.env.MONGO_URL,
        options: {},
    },
    auth: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            secretId: process.env.GOOGLE_SECREAT_ID,
            redirection: process.env.AUTH_REDIRECTION,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    cookie: {
        secret: process.env.COOKIE_SECRET,
    },
};

module.exports = config;
