const { default: axios } = require("axios");
const { exists } = require("../../server/src/models/category");
const { readAmenities } = require("./googleSheet");

const endPoint = "http://localhost:8082/api/categories";

async function importAmenities() {
  const amenities = await readAmenities();

  amenities.forEach(async (amenity, idx) => {
    console.log({ amenity });

    axios
      .post(endPoint, amenity, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer TOKEN"
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

importAmenities();
