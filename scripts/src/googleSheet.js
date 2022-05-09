const { GoogleSpreadsheet } = require("google-spreadsheet");
const dotenv = require("dotenv");
dotenv.config();

const readAmenities = async (title = "amenities") => {
  // setup the google spread sheet
  const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_FILE);

  // set up the API KEY
  doc.useApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByTitle[title]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  const rows = await sheet.getRows();

  const amenities = rows
    .map((row, idx) => {
      const { Key, Value, Comment } = row;
      if (!Value) {
        return null;
      }
      return {
        name: Value,
        description: Comment
      };
    })
    .filter((amenity) => amenity);

  return amenities;
};

const readGoogleFile = async ({ title, file }) => {
  // setup the google spread sheet
  const doc = new GoogleSpreadsheet(file);

  // set up the API KEY
  doc.useApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByTitle[title]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  const rows = await sheet.getRows();

  const items = rows
    .map((row, idx) => {
      const { Key, Value, Comment } = row;
      if (!Value) {
        return null;
      }
      return {
        name: Value,
        description: Comment
      };
    })
    .filter((item) => item); // filter out null row

  return items;
};

module.exports = {
  readAmenities,
  readGoogleFile
};
