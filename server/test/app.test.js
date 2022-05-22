'use strict';
const { test } = require('tap');
const build = require('../src/app');

// configure mongoose connection
const dbUrl = 'mongodb://localhost/test';
const mongoose = require('mongoose');
const { ERROR_MESSAGES, COOKIE_REFRESH_TOKEN } = require('../src/utility/constants');
const { initiliseDB } = require('../bk/initialise.db');

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

    const admin = await initiliseDB();

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

    t.test('POST new user - Duplicate', async (t) => {
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
        t.equal(response.statusCode, 409, ' - Get 409');
        t.same(json.message, ERROR_MESSAGES.DUPLICATE, '- duplicate');

        // end test
        t.end();
    });

    let authorization;

    t.test('Login user - wrong username', async (t) => {
        const payload = {
            username: 'wrong',
            password: 'mypassword',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/users/login',
            payload,
        });

        const json = await response.json();

        t.equal(response.statusCode, 401, ' - Unauthorised');
        t.same(json.message, 'Username or password is incorrect', '- Username incorrect');

        // end test
        t.end();
    });

    t.test('Login user - wrong password', async (t) => {
        const payload = {
            username: 'bikers@bicity.eu',
            password: 'wrong',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/users/login',
            payload,
        });

        const json = await response.json();

        t.equal(response.statusCode, 401, ' - Unauthorised');
        t.same(json.message, 'Username or password is incorrect', '- Incorrect password');

        // end test
        t.end();
    });

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

        const cookies = response.cookies;
        t.equal(cookies.length, 1, ' - Set 1 cookie');
        t.equal(cookies[0].name, '__Host-refreshToken', ' - cookie refresh');
        t.match(cookies[0].value, /.*\..*/, ' - cookie verified');
        t.equal(cookies[0].path, '/', ' - cookie for whole site');

        // save JWT
        authorization = response.headers?.authorization;
        t.match(authorization, /Bearer .*\..*\..*/, '- JWT found');

        const json = await response.json();
        user = json;
        t.equal(response.statusCode, 200, ' - Logged in');
        t.same(json.username, payload.username, '- get username');

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
        t.equal(json.message, ERROR_MESSAGES.UNAUTHORIZED, ' - Get error');

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

    t.test('POST  category same name', async (t) => {
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
        t.equal(response.statusCode, 409, ' - Get 409');
        t.same(json.message, ERROR_MESSAGES.DUPLICATE, '- Duplicate error');

        // end test
        t.end();
    });
    t.test('POST  Add second category', async (t) => {
        const payload = {
            name: 'parking',
            description: 'parking place',
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
        t.same(json.name, payload.name, '- check name');
        t.same(json.description, payload.description, '- check description');

        // end test
        t.end();
    });

    // test GET all categories
    let category;
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
        t.same(json.length, 2, '- get name');
        t.same(json[0].name, payload.name, '- get name');
        t.same(json[0].description, payload.description, '- get description');

        category = json[0];

        // end test
        t.end();
    });

    t.test('GET category by ID', async (t) => {
        const url = `/api/categories/${category._id}`;
        const response = await app.inject({
            method: 'GET',
            url,
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json._id, category._id, '- check ID');
        t.same(json.name, category.name, '- check name');
        t.same(json.description, category.description, '- check description');

        // end test
        t.end();
    });

    t.test('GET category by ID - Not Found', async (t) => {
        const url = `/api/categories/628a9bf27743a2dfd0e490a3`;
        const response = await app.inject({
            method: 'GET',
            url,
        });

        const json = await response.json();
        t.equal(response.statusCode, 404, ' - Get 404');
        t.same(json.message, ERROR_MESSAGES.ENTITY_NOT_FOUND, '- not found ');

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

    t.test('GET Feature  by  Id', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/feature/${feature._id}`,
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.properties, feature.properties, ' - Check properties');
        t.same(json.geometry, feature.geometry, ' - Check geometry');

        // end test
        t.end();
    });

    t.test('GET Feature  by  Id - Not found', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/feature/628aa624e701e9b0a485a84a`,
        });

        const json = await response.json();
        t.equal(response.statusCode, 404, ' - Get 404');
        t.same(json.message, ERROR_MESSAGES.ENTITY_NOT_FOUND, ' - Get Not found');

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
        t.equal(json.message, ERROR_MESSAGES.UNAUTHORIZED, ' - Get error message');

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
                coordinates: [20, 30],
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
        t.same(json.message, ERROR_MESSAGES.UNAUTHORIZED, '- get error message');

        response = await app.inject({
            method: 'POST',
            url,
            headers: {
                authorization: 'Bearer fake.token.test',
            },
        });

        json = await response.json();

        t.equal(response.statusCode, 401, ' - Get Unauthorized');
        t.same(json.message, ERROR_MESSAGES.TOKEN_INVALID, '- get error message');

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
        t.same(json.message, 'Feature Not Found', '- get error');

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
        t.same(json.message, 'User Not Found', '- get error');

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
        t.equal(json.message, ERROR_MESSAGES.UNAUTHORIZED, '- get error message');

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
        t.equal(json.message, 'User Not Found', '- get error');

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

    t.test('FIND 1 feature by bbox', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/feature/bbox?nlng=5&nlat=25&slng=15&slat=5',
        });

        const json = await response.json();
        feature = json;
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 1, '- get 1 point');
        t.same(json[0].geometry.coordinates, [10, 20], '- get geometry');

        // end test
        t.end();
    });

    t.test('FIND feature near me', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/feature/nearme?lng=20&lat=30&maxDistance=5000',
        });

        const featureProperties = {
            name: 'NAME',
            url: 'URL',
            phone: '123',
            country: 'COUNTRY',
            address: 'ADDRESS',
            city: 'CITY',
            category: 'bar',
            capacity: 10,
            description: 'simple description',
        };

        const json = await response.json();
        feature = json;

        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 1, '- get 1 point');
        t.same(json[0].geometry.coordinates, [20, 30], '- get geometry');
        t.same(json[0].properties, featureProperties, '- check Properties');

        // end test
        t.end();
    });

    t.test('FIND feature near me with Wrong category', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/feature/nearme?lng=20&lat=30&categories=test',
        });

        const json = await response.json();
        feature = json;
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 0, '- get 0 features');

        // end test
        t.end();
    });

    t.test('FIND feature near me with category', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/feature/nearme?lng=20&lat=30&categories=bar',
        });

        const json = await response.json();
        feature = json;

        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 1, '- get 1 feature');

        // end test
        t.end();
    });

    t.test('FIND feature near me with categories list', async (t) => {
        const payload = {
            type: 'Feature',
            properties: {
                name: 'NAME2',
                url: 'URL',
                phone: '123',
                country: 'COUNTRY',
                address: 'ADDRESS',
                city: 'CITY',
                category: 'parking',
                capacity: 10,
                description: 'simple description',
            },
            geometry: {
                type: 'Point',
                coordinates: [20.1, 30.2],
            },
        };

        await app.inject({
            method: 'POST',
            url: '/api/feature',
            payload,
            headers: {
                authorization,
            },
        });

        const response = await app.inject({
            method: 'GET',
            url: '/api/feature/nearme?lng=20&lat=30&categories=bar,parking&maxDistance=50000',
        });

        const json = await response.json();
        feature = json;
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 2, '- get 2 features');

        // end test
        t.end();
    });

    t.test('FIND 3 features by bbox', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/feature/bbox?nlng=5&nlat=31&slng=22&slat=5',
        });

        const json = await response.json();
        feature = json;
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 3, '- get 3 points');
        t.same(json[1].geometry.coordinates, [20.1, 30.2], '- get geometry');

        // end test
        t.end();
    });
    t.test('FIND features by bbox and category', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/feature/bbox?nlng=5&nlat=31&slng=22&slat=5&categories=noavailable',
        });

        const json = await response.json();
        feature = json;
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 0, '- get 0 points - no category found');

        // end test
        t.end();
    });

    t.test('GET all users - Not Admin', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/users',
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 403, ' - Get 403');
        t.same(json.message, ERROR_MESSAGES.FORBIDDEN, '- Forbidden');

        // end test
        t.end();
    });

    let adminAuthorization;
    let userAmin;

    // login user - get JWT token
    t.test('Login Admin user', async (t) => {
        const payload = {
            username: 'admin',
            password: 'password',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/users/login',
            payload,
        });

        // save JWT
        adminAuthorization = response.headers?.authorization;
        t.match(adminAuthorization, /Bearer .*\..*\..*/, '- JWT found');

        const json = await response.json();
        userAmin = json;
        t.equal(response.statusCode, 200, ' - Logged in');
        t.same(json.username, payload.username, '- get username');

        // end test
        t.end();
    });

    let users;
    t.test('GET all users by Admin role', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/users',
            headers: {
                authorization: adminAuthorization,
            },
        });

        const json = await response.json();
        users = json;
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.length, 4, '- Get 4 users');

        // end test
        t.end();
    });

    t.test('PUT update user - Not owner or Admin', async (t) => {
        const payload = {
            username: 'username changed',
        };
        const otherUser = users.find((user) => user.email !== 'bikers@bicity.eu');

        const response = await app.inject({
            method: 'PUT',
            url: `/api/users/${otherUser._id}`,
            headers: {
                authorization,
            },
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 403, ' - Get 403');
        t.same(json.message, ERROR_MESSAGES.FORBIDDEN, '- forbidden');

        // end test
        t.end();
    });

    t.test('GET user by Id - normal user', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/users/${users[0]._id}`,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 403, ' - Get Forbidden');
        t.same(json.message, ERROR_MESSAGES.FORBIDDEN, '- Forbidden message');

        // end test
        t.end();
    });

    t.test('GET user by Id - by user Admin', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/users/${users[0]._id}`,
            headers: {
                authorization: adminAuthorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.email, 'admin@bicity.info', '- Get user props');

        // end test
        t.end();
    });

    t.test('GET user by Id - Not found', async (t) => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/users/6287fa3aa96c0ae994ea0c5d`,
            headers: {
                authorization: adminAuthorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 404, ' - Get Not Found');
        t.same(json.message, ERROR_MESSAGES.ENTITY_NOT_FOUND, '- User not found');

        // end test
        t.end();
    });

    t.test('PUT update user - no authentication', async (t) => {
        const payload = {
            username: 'new username',
        };
        const response = await app.inject({
            method: 'PUT',
            url: `/api/users/${users[0]._id}`,
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 401, ' - Unauthorised');
        t.same(json.message, ERROR_MESSAGES.UNAUTHORIZED, '- error check');

        // end test
        t.end();
    });

    t.test('PUT update user - normal user', async (t) => {
        const payload = {
            username: 'new username',
        };
        const response = await app.inject({
            method: 'GET',
            url: `/api/users/${users[2]._id}`,
            headers: {
                authorization,
            },
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 403, ' - Get 403');
        t.same(json.message, ERROR_MESSAGES.FORBIDDEN, '- Forbidden');

        // end test
        t.end();
    });

    t.test('PUT update user - by Owner', async (t) => {
        const payload = {
            username: 'username changed',
            name: 'name changed',
            lastName: 'lastname changed',
            email: 'changed@bicity.eu',
            username: 'changed@bicity.eu',
            locale: 'it',
            picture: 'another picture',
            role: 'User',
        };
        const response = await app.inject({
            method: 'GET',
            url: `/api/users/${user._id}`,
            headers: {
                authorization,
            },
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        const { name, lastName, email, username, locale, picture, role } = json;
        t.same(json.name, name, '- name updated');
        t.same(json.lastName, lastName, '- lastName updated');
        t.same(json.email, email, '- email updated');
        t.same(json.username, username, '- username updated');
        t.same(json.locale, locale, '- locale updated');
        t.same(json.picture, picture, '- picture updated');
        t.same(json.role, role, '- role updated');

        // end test
        t.end();
    });

    t.test('PUT update user - Not Admin', async (t) => {
        const payload = {
            username: 'username changed',
        };
        const response = await app.inject({
            method: 'PUT',
            url: `/api/users/${users[3]._id}`,
            headers: {
                authorization,
            },
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 403, ' - Get 403');
        t.same(json.message, ERROR_MESSAGES.FORBIDDEN, '- forbidden');

        // end test
        t.end();
    });

    t.test('PUT update user - Admin role', async (t) => {
        const payload = {
            name: 'name changed',
            lastName: 'lastname changed',
            email: 'email@changed.com',
            username: 'username changed',
            locale: 'it',
            picture: 'another picture',
            role: 'Editor',
        };

        const response = await app.inject({
            method: 'PUT',
            url: `/api/users/${users[0]._id}`,
            headers: {
                authorization: adminAuthorization,
            },
            payload,
        });

        const json = await response.json();
        const { name, lastName, email, username, locale, picture, role } = payload;

        t.equal(response.statusCode, 200, ' - Get 200');

        t.same(json.name, name, '- name updated');
        t.same(json.lastName, lastName, '- lastName updated');
        t.same(json.email, email, '- email updated');
        t.same(json.username, username, '- username updated');
        t.same(json.locale, locale, '- locale updated');
        t.same(json.picture, picture, '- picture updated');
        t.same(json.role, role, '- role updated');

        // end test
        t.end();
    });

    t.test('DELETE user - anonymous', async (t) => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/api/users/${users[0]._id}`,
        });

        const json = await response.json();
        t.equal(response.statusCode, 401, ' - Get 401');
        t.same(json.message, ERROR_MESSAGES.UNAUTHORIZED, '- Unauthorised');

        // end test
        t.end();
    });

    t.test('DELETE user - not Admin', async (t) => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/api/users/${users[0]._id}`,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 403, ' - Get 403');
        t.same(json.message, ERROR_MESSAGES.FORBIDDEN, '- Forbidden');

        // end test
        t.end();
    });

    t.test('DELETE user - Admin', async (t) => {
        let response = await app.inject({
            method: 'DELETE',
            url: `/api/users/${users[0]._id}`,
            headers: {
                authorization: adminAuthorization,
            },
        });

        let json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');

        // check if the user exists again
        response = await app.inject({
            method: 'GET',
            url: `/api/users/${users[0]._id}`,
            headers: {
                authorization: adminAuthorization,
            },
        });

        json = await response.json();
        t.equal(response.statusCode, 404, ' - Get 404');

        // end test
        t.end();
    });

    t.test('POST revoke token - anonymous', async (t) => {
        const response = await app.inject({
            method: 'POST',
            url: `/api/users/revoke-token`,
        });

        const json = await response.json();
        t.equal(response.statusCode, 401, ' - Get 401');
        t.same(json.message, ERROR_MESSAGES.UNAUTHORIZED, '- Unauthorised');

        // end test
        t.end();
    });

    t.test('POST revoke token - normal user', async (t) => {
        const response = await app.inject({
            method: 'POST',
            url: `/api/users/revoke-token`,
            headers: {
                authorization,
            },
        });

        const json = await response.json();
        t.equal(response.statusCode, 400, ' - Get 400');
        t.same(json.message, ERROR_MESSAGES.COOKIE_TOKEN_MISSING, '- Unauthorised');

        // end test
        t.end();
    });

    // // end test
    t.end();
});
