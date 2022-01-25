const { parseAsync } = require("json2csv");

exports.downloadResource = (res, fileName, fields, data) => {
  const opts = { fields };

  parseAsync(data, opts)
    .then((csv) => {
      res.header("Content-Type", "text/csv; charset=utf-8");
      res.send(csv);
    })
    .catch((err) => console.error(err));
};
