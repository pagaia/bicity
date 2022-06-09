const axios = require("axios");
const fs = require("fs");
const Path = require("path");

var myArgs = process.argv;
console.log("myArgs: ", myArgs);

const [node, script, path, token] = myArgs;

// curl -X GET "http://localhost:8081/api/devices/608741ca57523b3bf1f25231" \
// -H  "accept: application/json" \
// -H "authorization: Bearer TOKEN"

// curl -X POST "http://localhost:8081/api/devices/608741ca57523b3bf1f25231/generateToken" -H  "accept: application/json"  \
// -H "authorization: Bearer TOKEN"

if (!path) {
  console.error("Please provide the file to load");
  console.error(`- node ${script} fileToLoad Token`);

  process.exit(1);
}

const endPoint = `http://localhost:8082/api/feature`;

function uploadFeature(data) {
  const features = data.map((feature, idx) => {
    console.debug({ feature });

    const { properties, geometry } = feature;

    const newItem = {
      properties: {
        ...properties,
        category: "parking"
      },
      geometry: {
        type: "Point",
        coordinates: [geometry.x, geometry.y]
      }
    };

    console.debug(newItem);
    return newItem;
  });

  features.forEach((feature) => {
    return axios
      .post(endPoint, feature, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxZmM2M2Q5ZTM0MWVhZDI3ZWIxZDIzMiIsIm5hbWUiOiJIYXkgQmlrZXJkamoiLCJsYXN0TmFtZSI6IkJpa2VyIiwidXNlcm5hbWUiOiJ1c2VyMUBiaWNpdHkuY29tIiwicm9sZSI6IlVzZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9hcGkubXVsdGlhdmF0YXIuY29tL0hheSBCaWtlcmRqaiBCaWtlci5wbmciLCJlbWFpbCI6InVzZXIxQGJpY2l0eS5jb20ifSwiaWF0IjoxNjU0ODA3Nzk4LCJleHAiOjE2NTQ4MDk1OTh9.8hePAt6IMECGV292vFzZ4sbmrweSJ7OwK0MqX2mp8q8"
        }
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

const file = JSON.parse(fs.readFileSync(path));
uploadFeature(file);

