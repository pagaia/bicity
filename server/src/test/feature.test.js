"use strict";

const { test } = require("tap");
const { build, config } = require("./prepareTest");

test("should test all feature endpoints", async (t) => {
  const app = build(t);

  let feature = {};

  // close fastify after each test
  t.teardown(() => app.close());

  // only to test error path
  t.test("GET / root", async (t) => {
    const response = await app.inject({
      method: "GET",
      url: "/"
    });

    const json = response.json();
    t.equal(response.statusCode, 200, " - Get 200");
    t.equal(
      response.headers["content-type"],
      "application/json; charset=utf-8",
      " - get content type"
    );
    t.deepEqual(
      json,
      {
        message:
          "Hello, welcome to BiCity, the bikers platform for locale information"
      },
      "- get hello"
    );
  });

  t.test("POST new feature", async (t) => {
    const payload = {
      type: "Feature",
      properties: {
        name: "NAME",
        url: "URL",
        phone: "123",
        country: "COUNTRY",
        address: "ADDRESS",
        city: "CITY",
        category: "bar",
        capacity: 10,
        description: "simple description"
      },
      geometry: {
        type: "Point",
        coordinates: [10, 20]
      }
    };

    const response = await app.inject({
      method: "POST",
      url: "/api/feature",
      payload: feature
    });

    const json = response.json();
    t.equal(response.statusCode, 201, " - Get 201");

    t.deepEqual(
      json,
      {
        message:
          "Hello, welcome to BiCity, the bikers platform for locale information"
      },
      "- get hello"
    );

    feature = json;
  });
});

// test("should get an empty device list", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const response = await app.inject({
//     method: "GET",
//     url: "/api/devices",
//   });

// test("should get an empty device list", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const response = await app.inject({
//     method: "GET",
//     url: "/api/devices"
//   });

//   t.strictEqual(response.statusCode, 200, " - get 200");
//   t.strictEqual(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     "- get Json/application"
//   );
//   t.deepEqual(response.json(), [], " - get empty array");
// });

// test("should insert a device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const response = await app.inject({
//     method: "POST",
//     url: "/api/devices",
//     payload,
//   });

//   t.equal(response.statusCode, 201, " - return 201");
//   t.equal(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     " - accept application/json"
//   );
//   const json = response.json();
//   deviceId = json._id;

//   t.equal(json.name, payload.name, " - Same name");
//   t.same(
//     json.location.coordinates,
//     payload.location.coordinates,
//     " - same coordinates"
//   );
// });

// test("should raise unique contraint on insert same device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const response = await app.inject({
//     method: "POST",
//     url: "/api/devices",
//     payload,
//   });

//   t.equal(response.statusCode, 409, " - Duplicate Error");
//   t.equal(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     " - accept application/json"
//   );
//   t.equal(
//     response.json().error,
//     "Duplicate Object. Please check you data",
//     " duplicate messqge"
//   );
// });

// test("should insert a list of devices", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   for (let dev = 0; dev < 10; dev++) {
//     const insert = await app.inject({
//       method: "POST",
//       url: "/api/devices",
//       payload: { ...payload, name: `Device#${dev}` },
//     });
//   }

//   const response = await app.inject({
//     method: "GET",
//     url: "/api/devices",
//   });

//   t.equal(response.statusCode, 200, " - return 200");

//   const json = response.json();
//   t.equal(json.length, 11, " - found 11 devices");
// });

// test("should get a device by ID", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const response = await app.inject({
//     method: "GET",
//     url: `/api/devices/${deviceId}`,
//   });

//   t.equal(response.statusCode, 200, " - 200 device found");
//   t.equal(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     " - accept application/json"
//   );
//   const json = response.json();
//   deviceId = json._id;

//   t.equal(json.name, payload.name, " - Same name");
//   t.same(
//     json.location.coordinates,
//     payload.location.coordinates,
//     " - same coordinates"
//   );
// });

// test("should update a device ", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const update = await app.inject({
//     method: "PUT",
//     url: `/api/devices/${deviceId}`,
//     payload: changedPayload,
//   });

//   t.equal(update.statusCode, 200, " - return 200");

//   const response = await app.inject({
//     method: "GET",
//     url: `/api/devices/${deviceId}`,
//   });

//   t.equal(response.statusCode, 200, " - return 200");
//   t.equal(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     "should accept application/json"
//   );

//   const json = response.json();

//   t.equal(json.name, changedPayload.name, " - Updated name");
//   t.equal(
//     json.description,
//     changedPayload.description,
//     " - Updated description"
//   );

//   t.same(
//     json.location.coordinates,
//     payload.location.coordinates,
//     " - same coordinates"
//   );
// });

// test("should get 404 on update a not found device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const update = await app.inject({
//     method: "PUT",
//     url: "/api/devices/notfound",
//     payload: changedPayload,
//   });

//   t.equal(update.statusCode, 404, " - return 404 not found");
// });

// test("should get 404 on update a not existing device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const update = await app.inject({
//     method: "PUT",
//     url: "/api/devices/6057ca5237170c657439b45f",
//     payload: changedPayload,
//   });

//   t.equal(update.statusCode, 404, " - return 404 not found");
// });

// test("should delete a device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const remove = await app.inject({
//     method: "DELETE",
//     url: `/api/devices/${deviceId}`,
//   });

//   t.equal(remove.statusCode, 200, " - Removed: http status 200");
// });

// test("should return NotFound on deleting an not existing device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const remove = await app.inject({
//     method: "DELETE",
//     url: `/api/devices/111111111111111111`,
//   });

//   t.equal(remove.statusCode, 404, " - Not found ");
// });

// test("should return NotFound on deleting an not existing device 2", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   const remove = await app.inject({
//     method: "DELETE",
//     url: `/api/devices/6057ca5237170c657439b45f`,
//   });

//   t.equal(remove.statusCode, 404, " - Not found ");
// });

// test("should add a feed for device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   // first insert a device
//   const insert = await app.inject({
//     method: "POST",
//     url: "/api/devices",
//     payload: { ...changedPayload, name: `Feed Device` },
//   });
//   const devId = insert.json()._id;

//   const response = await app.inject({
//     method: "POST",
//     url: `/api/devices/${devId}/feeds`,
//     payload: payloadFeed
//   });

//   t.equal(response.statusCode, 201, " - return 201");
//   t.equal(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     " - accept application/json"
//   );
//   const json = response.json();
//   const {
//     hourly,
//     hourlyDay,
//     daily,
//     battery,
//     gmsErrorNumber,
//     htmlErrorNumber,
//     sendErrorNumber,
//     yesterday,
//   } = json[0];

//   t.equal(hourly, payloadFeed.hourly, " - check hourly");
//   t.equal(hourlyDay, payloadFeed.hourlyDay, " - check hourlyDay");
//   t.equal(daily, payloadFeed.daily, " - check daily");
//   t.equal(battery, payloadFeed.battery, " - check battery");
//   t.equal(gmsErrorNumber, payloadFeed.gmsErrorNumber, " - check gmsErrorNumber");
//   t.equal(htmlErrorNumber, payloadFeed.htmlErrorNumber, " - check htmlErrorNumber");
//   t.equal(sendErrorNumber, payloadFeed.sendErrorNumber, " - check sendErrorNumber");
//   t.equal(yesterday, payloadFeed.yesterday, " - check yesterday");
// });

// test("should get feeds for device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   // first insert a device
//   const insert = await app.inject({
//     method: "POST",
//     url: "/api/devices",
//     payload: { ...changedPayload, name: `Feed Device2` },
//   });
//   const devId = insert.json()._id;

//   await app.inject({
//     method: "POST",
//     url: `/api/devices/${devId}/feeds`,
//     payload: payloadFeed
//   });

//   const response = await app.inject({
//     method: "GET",
//     url: `/api/devices/${devId}/feeds`,
//   });

//   t.equal(response.statusCode, 200, " - return 200");
//   t.equal(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     " - accept application/json"
//   );
//   const json = response.json();
//   const {
//     hourly,
//     hourlyDay,
//     daily,
//     battery,
//     gmsErrorNumber,
//     htmlErrorNumber,
//     sendErrorNumber,
//     yesterday,
//   } = json[0];

//   t.equal(hourly, payloadFeed.hourly, " - check hourly");
//   t.equal(hourlyDay, payloadFeed.hourlyDay, " - check hourlyDay");
//   t.equal(daily, payloadFeed.daily, " - check daily");
//   t.equal(battery, payloadFeed.battery, " - check battery");
//   t.equal(gmsErrorNumber, payloadFeed.gmsErrorNumber, " - check gmsErrorNumber");
//   t.equal(htmlErrorNumber, payloadFeed.htmlErrorNumber, " - check htmlErrorNumber");
//   t.equal(sendErrorNumber, payloadFeed.sendErrorNumber, " - check sendErrorNumber");
//   t.equal(yesterday, payloadFeed.yesterday, " - check yesterday");
// });

// test("should raise error on adding feed for not existing device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   // first insert a device
//   const insert = await app.inject({
//     method: "POST",
//     url: "/api/devices",
//     payload: { ...changedPayload, name: `Feed Device3` },
//   });
//   const devId = insert.json()._id;

//   const add = await app.inject({
//     method: "POST",
//     url: `/api/devices/6057ca5237170c657439b45f/feeds`,
//   });

//   t.equal(add.statusCode, 404, " - return 404");
//   t.equal(
//     add.headers["content-type"],
//     "application/json; charset=utf-8",
//     " - accept application/json"
//   );
// });

// test("should raise error Not found for get feed for non existing device", async (t) => {
//   const app = build(t);

//   const conf = config();
//   // close fastify after each test
//   t.tearDown(() => app.close());

//   // first insert a device
//   const insert = await app.inject({
//     method: "POST",
//     url: "/api/devices",
//     payload: { ...changedPayload, name: `Feed Device3` },
//   });
//   const devId = insert.json()._id;

//   const response = await app.inject({
//     method: "GET",
//     url: `/api/devices/6057ca5237170c657439b45f/feeds`,
//   });

//   t.equal(response.statusCode, 404, " - return 404");
//   t.equal(
//     response.headers["content-type"],
//     "application/json; charset=utf-8",
//     " - accept application/json"
//   );
// });
