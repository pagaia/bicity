const { default: axios } = require("axios");
const { exists } = require("../../server/src/models/category");
const { readGoogleFile } = require("./googleSheet");

const endPoint = "http://localhost:8082/api/categories";

async function importEmergency() {
  const emergencies = await readGoogleFile({
    title: "emergency",
    file: "FILEKEY"
  });

  emergencies.forEach(async (emergency, idx) => {
    console.debug({ emergency });

    axios
      .post(endPoint, emergency, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer TOKEN"
        }
      })
      .then((res) => {
        console.debug(`statusCode: ${res.statusCode}`);
        console.debug(res);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

importEmergency();
