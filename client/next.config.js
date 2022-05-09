const withPWA = require('next-pwa');

module.exports = withPWA({
    pwa: {
        dest: 'public',
    },
});

module.exports = withPWA({
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:8082/api/:slug*',
            },
        ];
    },
    images: {
        domains: [
            'images.pexels.com',
            'lh3.googleusercontent.com',
            'api.multiavatar.com',
            'platform-lookaside.fbsbx.com',
        ],
    },
    pwa: {
        dest: 'public',
    },
});
