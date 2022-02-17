module.exports = {
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
};
