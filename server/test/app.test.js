'use strict';
const { test } = require('tap');

const build = require('../src/app');

// configure mongoose connection
const dbUrl = 'mongodb://localhost/test';
const mongoose = require('mongoose');

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

    // console.log({ client });
    const opts = {
        config: {
            jwt: {
                secret: 'averyverylongsecret',
            },
            mongodb: {
                client,
            },
        },
        logger: {
            level: 'warn',
            prettyPrint: true,
        },
    };
    return opts;
};

// test('requests the "/" route', async (t) => {
//     t.plan(1);
//     const opts = await initiliseDBAndOpts();
//     const app = build(opts);

//     // At the end of your tests it is highly recommended to call `.close()`
//     // to ensure that all connections to external services get closed.
//     t.teardown(async () => {
//         // console.log('Close mongo connection');
//         // await app.mongodb.client.close();
//         console.log('Close app');

//         await app.close();
//         process.exit();
//     });

//     const response = await app.inject({
//         method: 'GET',
//         url: '/',
//     });

//     // console.log({ response });
//     t.equal(response.statusCode, 200, 'returns a status code of 200');

//     // end test
//     t.end();
// });

test('test all APIs', async (t) => {
    t.plan(7);
    const opts = await initiliseDBAndOpts();
    const app = build(opts);
    // clean the DB before starting
    await clearCollections(opts.config.mongodb.client);

    let feature, user, feature2;

    // close fastify after each test
    t.teardown(async () => {
        // console.log('Close mongo connection');
        // await app.mongodb.client.close();
        console.log('Close app');

        // await clearCollections(opts.config.mongodb.client);
        await app.close();
        // without the process exit the application remains pending
        process.exit(0);
    });

    // only to test error path
    t.test('GET / root', async (t) => {
        t.plan(3);
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

    // test Add new category
    t.test('POST new category', async (t) => {
        t.plan(2);
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
        t.equal(response.statusCode, 201, ' - Get 201');

        t.same(json.properties, payload.properties, '- get properties');

        // end test
        t.end();
    });

    t.test('POST new feature', async (t) => {
        t.plan(2);
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
        feature = json;
        t.equal(response.statusCode, 201, ' - Get 201');
        t.same(json.properties, payload.properties, '- get properties');

        // console.log({ feature });

        // end test
        t.end();
    });

    // test Add new user
    t.test('POST new user', async (t) => {
        t.plan(2);
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
        t.same(json.properties, payload.properties, '- get properties');

        // console.log({ user });

        // end test
        t.end();
    });

    // test User add a vote for the feature just added
    t.test('POST a new vote', async (t) => {
        t.plan(3);
        const payload = {
            vote: 5,
        };

        const response = await app.inject({
            method: 'POST',
            url: `/api/vote/${feature._id}/${user._id}`,
            payload,
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.same(json.user, user._id, '- get user ID');
        t.same(json.feature, feature._id, '- get feature ID');

        // end test
        t.end();
    });

    t.test('GET vote by feature and user Id', async (t) => {
        t.plan(1);

        const response = await app.inject({
            method: 'GET',
            url: `/api/vote/${feature._id}/${user._id}`,
        });

        const json = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        // console.log({ json });
        // end test
        t.end();
    });

    t.test('Should return average of vote', async (t) => {
        t.plan(2);

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
        const user2 = await res.json();

        await app.inject({
            method: 'POST',
            url: `/api/vote/${feature._id}/${user2._id}`,
            payload: { vote: 2 },
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
        });

        const json = await responseFeature.json();
        feature2 = json;

        await app.inject({
            method: 'POST',
            url: `/api/vote/${feature2._id}/${user3._id}`,
            payload: { vote: 5 },
        });

        const response = await app.inject({
            method: 'GET',
            url: `/api/vote/feature/${feature._id}`,
        });

        const vote = await response.json();
        t.equal(response.statusCode, 200, ' - Get 200');
        t.equal(vote.average, 3.5, ' - Get 3.5 as average');
        // console.log({ json });
        // end test
        t.end();
    });

    // // end test
    t.end();
});
