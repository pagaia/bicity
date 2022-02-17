exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'BiCity - Bicycle for City',
            description: `Building a simple app to share information and point of interests among ciclists around the world. 
        Each bikers' community can benefit from information everyone can share with geoposition`,
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
            },
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://github.com/pagaia/bicity',
            description: 'More info on the github project',
        },
        host: 'www.bicity.tk',
        schemes: ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        definitions: {
            User: {
                type: 'object',
                required: ['name', 'lastName', 'email', 'username'],
                properties: {
                    name: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    username: { type: 'string' },
                    accessToken: { type: 'string' },
                    tokenCreationDate: { type: 'string', format: 'date-time' },
                    tokenHost: { type: 'string' },
                },
            },
            Feature: {
                type: 'object',
                properties: {
                    name: 'string',
                    url: 'string',
                    phone: 'string',
                    country: 'string',
                    address: 'string',
                    city: 'string',
                    category: 'string',
                    description: 'string',
                },
                geometry: {
                    type: 'object',
                },
            },
            ApiResponse: {
                type: 'object',
                properties: {
                    code: { type: 'integer', format: 'int32' },
                    type: { type: 'string' },
                    message: { type: 'string' },
                },
            },
        },
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
            apiKey: {
                type: 'apiKey',
                name: 'x-api-token',
                in: 'header',
            },
            APIKeyHeader: {
                type: 'apiKey',
                name: 'x-api-token',
                in: 'header',
            },
        },
        security: {
            apiKey: [],
            APIKeyHeader: [],
        },
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: true,
    },
    exposeRoute: true,
};
