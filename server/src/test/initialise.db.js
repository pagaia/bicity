const Category = require("../models/category");
const categoryList = require("../../data/category.json");

exports.initiliseDB = async () => {
  return await Promise.all(
    categoryList.forEach(async (item) => {
      await Category.updateOne({ name: item.name }, item, {
        new: true,
        upsert: true
      }).exec();
    })
  );
};
