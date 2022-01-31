// External Dependancies
const mongoose = require("mongoose");

/**
 * Define category model
 */
const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
