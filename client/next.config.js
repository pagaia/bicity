module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:slug*',
          destination: 'http://localhost:8081/api/:slug*'
        },
      ]
    },
  }