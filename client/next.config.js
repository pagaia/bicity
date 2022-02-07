module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:8081/api/:slug*',
            },
        ];
    },
    images: {
        domains: ['images.pexels.com', 'lh3.googleusercontent.com', 'api.multiavatar.com'],
    },
};
