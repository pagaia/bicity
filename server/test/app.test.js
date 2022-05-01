'use strict';
const { test } = require('tap');

const build = require('../src/app');

// configure mongoose connection
const dbUrl = 'mongodb://localhost/test';
const mongoose = require('mongoose');
const { ERROR_MESSAGES } = require('../src/utility/constants');

const clearCollections = async (client) => {
    console.log('Delete all collections');

    for (let collection in client.collections) {
        console.log('Deleting ', collection);
        await client.collections[collection].deleteMany({});
    }
};

const initiliseDBAndOpts = async () => {
    await mongoose.connect(dbUrl);
    const client = mongoose.connection;

    const opts = {
        config: {
            jwt: {
                secret: 'averyverylongsecret',
            },
            mongodb: {
                client,
            },
            cookie: {
                secret: 'cookie-secret',
            },
        },
        logger: {
            level: 'warn',
            prettyPrint: true,
        },
    };
    return opts;
};

test('test APIs', async (t) => {
    const opts = await initiliseDBAndOpts();
    const app = build(opts);
    // clean the DB before starting
    await clearCollections(opts.config.mongodb.client);

    let feature, user, feature2;

    // close fastify after each test
    t.teardown(async () => {
        console.log('Close app');

        await app.close();
        // without the process exit the application remains pending
        process.exit(0);
    });

    // only to test error path
    t.test('GET / root', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/',
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.equal(
            response.headers['content-type'],
            'application/json; charset=utf-8',
            ' - get content type'
        );
        t.same(
            json,
            {
                message: 'Hello, welcome to BiCity, the bikers platform for locale information',
            },
            '- get hello'
        );

        // end test
        t.end();
    });

    // test Add new user
    t.test('POST new user', async (t) => {
        const payload = {
            name: 'Hey',
            lastName: 'Bikers',
            email: 'bikers@bicity.eu',
            username: 'bikers@bicity.eu',
            password: 'mypassword',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/users',
            payload,
        });

        const json = await response.json();
        user = json;
        t.equal(response.statusCode, 201, ' - Get 201');
        t.same(json.name, payload.name, '- same name');
        t.same(json.lastName, payload.lastName, '- same lastName');
        t.same(json.email, payload.email, '- same email');
        t.same(json.username, payload.username, '- same username');

        // end test
        t.end();
    });

    let authorization;

    // login user - get JWT token
    t.test('Login user', async (t) => {
        const payload = {
            username: 'bikers@bicity.eu',
            password: 'mypassword',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/users/login',
            payload,
        });

        // save JWT
        authorization = response.headers?.authorization;
        t.match(authorization, /Bearer .*\..*\..*/, '- JWT found');

        const json = await response.json();
        user = json;
        t.equal(response.statusCode, 200, ' - Logged in');
        t.same(json.properties, payload.properties, '- get properties');

        // end test
        t.end();
    });

    t.test('POST new category - without Authorisation', async (t) => {
        const payload = {
            name: 'bar',
            description: 'simple description',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/categories',
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 401, ' - Get Unauthorized');
        t.equal(json.error, ERROR_MESSAGES.UNAUTHORIZED, ' - Get error');

        // end test
        t.end();
    });

    t.test('POST new category', async (t) => {
        const payload = {
            name: 'bar',
            description: 'simple description',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/categories',
            payload,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 201, ' - Get 201');
        t.same(json.name, payload.name, '- get name');
        t.same(json.description, payload.description, '- get description');

        // end test
        t.end();
    });

    // test GET all categories
    t.test('GET all categories', async (t) => {
        const payload = {
            name: 'bar',
            description: 'simple description',
        };

        const response = await app.inject({
            method: 'GET',
            url: '/api/categories',
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 1, '- get name');
        t.same(json[0].name, payload.name, '- get name');
        t.same(json[0].description, payload.description, '- get description');

        // end test
        t.end();
    });

    t.test('POST new feature - No authorization', async (t) => {
        const payload = {
            type: 'Feature',
            properties: {
                name: 'NAME',
                url: 'URL',
                phone: '123',
                country: 'COUNTRY',
                address: 'ADDRESS',
                city: 'CITY',
                category: 'bar',
                capacity: 10,
                description: 'simple description',
            },
            geometry: {
                type: 'Point',
                coordinates: [10, 20],
            },
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/feature',
            payload,
        });

        const json = await response.json();

        t.equal(response.statusCode, 401, ' - Get Unauthorized');

        // end test
        t.end();
    });

    t.test('POST new feature', async (t) => {
        const payload = {
            type: 'Feature',
            properties: {
                name: 'NAME',
                url: 'URL',
                phone: '123',
                country: 'COUNTRY',
                address: 'ADDRESS',
                city: 'CITY',
                category: 'bar',
                capacity: 10,
                description: 'simple description',
            },
            geometry: {
                type: 'Point',
                coordinates: [10, 20],
            },
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/feature',
            payload,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        feature = json;
        t.equal(response.statusCode, 201, ' - Get 201');
        // verify properties
        t.same(json.properties, payload.properties, '- get properties');
        t.same(json.geometry, payload.geometry, '- get geometry');

        // end test
        t.end();
    });

    t.test('POST a new vote - Unauthorized', async (t) => {
        const payload = {
            vote: 5,
        };

        const response = await app.inject({
            method: 'POST',
            url: `/api/vote/${feature._id}/${user._id}`,
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 401, ' - Get Unautorized');

        // end test
        t.end();
    });

    t.test('POST a new vote', async (t) => {
        const payload = {
            vote: 5,
        };

        const response = await app.inject({
            method: 'POST',
            url: `/api/vote/${feature._id}/${user._id}`,
            payload,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.user, user._id, '- get user ID');
        t.same(json.feature, feature._id, '- get feature ID');

        // end test
        t.end();
    });

    t.test('GET vote by feature and user Id', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/vote/${feature._id}/${user._id}`,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.equal(json.vote, 5, ' - Get Vote');

        // end test
        t.end();
    });

    t.test('GET vote by feature and user Id - Unauthorized', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/vote/${feature._id}/${user._id}`,
        });

        const json = await response.json();
        t.equal(response.statusCode, 401, ' - Get Unautorized');
        t.equal(json.error, ERROR_MESSAGES.UNAUTHORIZED, ' - Get error message');

        // end test
        t.end();
    });

    let user2;
    t.test('Should return average of vote', async (t) => {
        // add another user
        const payload = {
            name: 'Hey',
            lastName: 'Bikers2',
            email: 'bikers2@bicity.eu',
            username: 'bikers2@bicity.eu',
            password: 'mypassword',
        };

        const res = await app.inject({
            method: 'POST',
            url: '/api/users',
            payload,
        });

        user2 = await res.json();

        await app.inject({
            method: 'POST',
            url: `/api/vote/${feature._id}/${user2._id}`,
            payload: { vote: 2 },
            headers: {
                authorization,
            },
        });

        // add 3rd user
        const payload3 = {
            name: 'Hey',
            lastName: 'Bikers3',
            email: 'bikers3@bicity.eu',
            username: 'bikers3@bicity.eu',
            password: 'mypassword',
        };

        const res3 = await app.inject({
            method: 'POST',
            url: '/api/users',
            payload: payload3,
        });
        const user3 = await res3.json();

        const featurePayload = {
            type: 'Feature',
            properties: {
                name: 'NAME',
                url: 'URL',
                phone: '123',
                country: 'COUNTRY',
                address: 'ADDRESS',
                city: 'CITY',
                category: 'bar',
                capacity: 10,
                description: 'simple description',
            },
            geometry: {
                type: 'Point',
                coordinates: [10, 20],
            },
        };

        const responseFeature = await app.inject({
            method: 'POST',
            url: '/api/feature',
            payload: featurePayload,
            headers: {
                authorization,
            },
        });

        const json = await responseFeature.json();
        feature2 = json;

        await app.inject({
            method: 'POST',
            url: `/api/vote/${feature2._id}/${user3._id}`,
            payload: { vote: 5 },
            headers: {
                authorization,
            },
        });

        const response = await app.inject({
            method: 'GET',
            url: `/api/vote/feature/${feature._id}`,
            headers: {
                authorization,
            },
        });

        const vote = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.equal(vote.average, 3.5, ' - Get 3.5 as average');

        // end test
        t.end();
    });

    t.test('POST a new favorite feature', async (t) => {
        const url = `/api/favorite/${user._id}/${feature._id}`;

        const response = await app.inject({
            method: 'POST',
            url,
            headers: {
                authorization,
            },
        });

        const json = await response.json();

        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.user, user._id, '- get user ID');
        t.same(json.features[0], feature, '- get feature ID');
        t.same(json.features[0].properties, feature.properties, '- get feature properties');
        t.same(
            json.features[0].geometry.coordinates,
            feature.geometry.coordinates,
            '- get feature geometry'
        );

        // end test
        t.end();
    });

    t.test('POST the same favorite feature again', async (t) => {
        const url = `/api/favorite/${user._id}/${feature._id}`;

        const response = await app.inject({
            method: 'POST',
            url,
            headers: {
                authorization,
            },
        });

        const json = await response.json();

        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.user, user._id, '- get user ID');
        t.same(json.features.length, 1, '- get one favorite feature');
       

        // end test
        t.end();
    });


    t.test('POST a new favorite feature - Unauthorized', async (t) => {
        const url = `/api/favorite/${user._id}/${feature._id}`;

        let response = await app.inject({
            method: 'POST',
            url,
        });

        let json = await response.json();

        t.equal(response.statusCode, 401, ' - Get Unauthorized');
        t.same(json.error, ERROR_MESSAGES.UNAUTHORIZED, '- get error message');

        response = await app.inject({
            method: 'POST',
            url,
            headers: {
                authorization: 'Bearer fake.token.test',
            },
        });

        json = await response.json();

        t.equal(response.statusCode, 401, ' - Get Unauthorized');
        t.same(json.error, ERROR_MESSAGES.TOKEN_INVALID, '- get error message');

        // end test
        t.end();
    });

    // test add a second favorite feature for user
    t.test('POST a second favorite feature', async (t) => {
        const url = `/api/favorite/${user._id}/${feature2._id}`;

        const response = await app.inject({
            method: 'POST',
            url,
            headers: {
                authorization,
            },
        });

        const json = await response.json();

        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.user, user._id, '- get user ID');
        t.equal(json.features.length, 2, '- get 2 features');

        t.same(json.features[0], feature, '- get feature ID');
        t.same(json.features[0].properties, feature.properties, '- get feature properties');
        t.same(
            json.features[0].geometry.coordinates,
            feature.geometry.coordinates,
            '- get feature geometry'
        );

        t.same(json.features[1], feature2, '- get feature2 ID');
        t.same(json.features[1].properties, feature2.properties, '- get feature2 properties');
        t.same(
            json.features[1].geometry.coordinates,
            feature2.geometry.coordinates,
            '- get feature2 geometry'
        );

        // end test
        t.end();
    });

    // test add a favorite feature for fake feature
    t.test('POST a new favorite feature - fake feature', async (t) => {
        const url = `/api/favorite/${user._id}/6269b7a1c76f7d54c2314522`;

        const response = await app.inject({
            method: 'POST',
            url,
            headers: {
                authorization,
            },
        });

        const json = await response.json();

        t.equal(response.statusCode, 404, ' - Get 404');
        t.same(json.error, 'Feature Not Found', '- get error');

        // end test
        t.end();
    });

    // test add a favorite feature for fake user
    t.test('POST a new favorite feature - fake user', async (t) => {
        const url = `/api/favorite/6269b7a1c76f7d54c2314522/${feature._id}`;

        const response = await app.inject({
            method: 'POST',
            url,
            headers: {
                authorization,
            },
        });

        const json = await response.json();

        t.equal(response.statusCode, 404, ' - Get 404');
        t.same(json.error, 'User Not Found', '- get error');

        // end test
        t.end();
    });

    t.test('GET favorites feature - Unauthorized', async (t) => {
        const url = `/api/favorite/${user._id}`;

        const response = await app.inject({
            method: 'GET',
            url,
        });

        const json = await response.json();
        t.equal(response.statusCode, 401, ' - Get Unauthorized');
        t.equal(json.error, ERROR_MESSAGES.UNAUTHORIZED, '- get error message');

        // end test
        t.end();
    });

    t.test('GET favorites feature', async (t) => {
        const url = `/api/favorite/${user._id}`;

        const response = await app.inject({
            method: 'GET',
            url,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.equal(json.length, 2, '- get 2 features');

        t.same(json[0], feature, '- get feature ID');
        t.same(json[0].properties, feature.properties, '- get feature properties');
        t.same(
            json[0].geometry.coordinates,
            feature.geometry.coordinates,
            '- get feature geometry'
        );

        t.same(json[1], feature2, '- get feature2 ID');
        t.same(json[1].properties, feature2.properties, '- get feature2 properties');
        t.same(
            json[1].geometry.coordinates,
            feature2.geometry.coordinates,
            '- get feature2 geometry'
        );

        // end test
        t.end();
    });

    // test GET favorite features for fake user
    t.test('GET favorites feature 404', async (t) => {
        const url = `/api/favorite/6269b7a1c76f7d54c2314522`;

        const response = await app.inject({
            method: 'GET',
            url,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 404, ' - Get 404');
        t.equal(json.error, 'User Not Found', '- get error');

        // end test
        t.end();
    });

    t.test('DELETE favorites feature - fake user', async (t) => {
        let url = `/api/favorite/6269b7a1c76f7d54c2314522/${feature2._id}`;

        let response = await app.inject({
            method: 'DELETE',
            url,
            headers: {
                authorization,
            },
        });

        await response.json();

        t.equal(response.statusCode, 404, ' - User not found');

        // end test
        t.end();
    });

    t.test('DELETE favorites feature', async (t) => {
        let url = `/api/favorite/${user._id}/${feature2._id}`;

        let response = await app.inject({
            method: 'DELETE',
            url,
            headers: {
                authorization,
            },
        });

        let json = await response.json();

        t.equal(response.statusCode, 200, ' - Get 200');

        url = `/api/favorite/${user._id}`;

        response = await app.inject({
            method: 'GET',
            url,
            headers: {
                authorization,
            },
        });

        json = await response.json();

        t.equal(response.statusCode, 200, ' - Get 200');
        t.equal(json.length, 1, '- get one feature');

        // end test
        t.end();
    });

    t.test('DELETE favorites feature - Unauthorized', async (t) => {
        let url = `/api/favorite/${user._id}/${feature2._id}`;

        let response = await app.inject({
            method: 'DELETE',
            url,
        });

        let json = await response.json();

        t.equal(response.statusCode, 401, ' - Get Unahotorized');

        // end test
        t.end();
    });

    // // end test
    t.end();
});
