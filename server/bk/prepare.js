'use strict';

// This file contains code that we reuse
// between our tests.
const clean = require('mongo-clean');
// const Fastify = require("fastify");
// const fp = require("fastify-plugin");
const App = require('../app');
const { beforeEach, before, teardown, test } = require('tap');
// const configMongo = require("../config/config");

const dbUrl = 'mongodb://localhost/test';
const mongoose = require('mongoose');
const { initiliseDB } = require('./initialise.db.js');

function clearCollections() {
    console.log('Delete all collections');
    for (let collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteMany({});
    }
}

let client;

// connect and initialise the DB
before(async function () {
    // if connection is down then open it
    if (!client || client.readyState === 0) {
        await mongoose.connect(dbUrl);
        client = mongoose.connection;
    }
    console.log({ before: client.readyState });
    await initiliseDB();
});

beforeEach(async function () {
    // if connection is down then open it
    if (!client || client.readyState === 0) {
        await mongoose.connect(dbUrl);
        client = mongoose.connection;
    }
});

// teardown(async function () {
//   // if connection/client is ready (open) clear all collections and close it
//   if (client && client.readyState) {
//     console.log("Close DB connection");
//     clearCollections();
//     await client.close();
//     client = null;
//   }
// });

// Fill in this config with all the configurations
// needed for testing the application
function config() {
    return {
        jwt: {
            secret: 'averyverylongsecret',
        },
        mongodb: {
            client,
        },
    };
}

// automatically build and tear down our instance
function build(t) {
    const app = App({
        config: config(),
        logger: {
            level: 'warn',
            prettyPrint: true,
        },
    });

    // tear down our app after we are done
    // t.teardown(app.close.bind(app));
    t.teardown(async () => {
        console.log('teardown');
        clearCollections();
        await clean(app.mongo.client.db('test'));
        await app.close();
        console.log('COLSE');
    });

    return app;
}

module.exports = {
    config,
    build,
};
