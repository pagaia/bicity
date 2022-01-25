// External Dependancies
const mongoose = require("mongoose");

/**
 * Define category model
 */
const Category = new mongoose.Schema(
  {
    name: String,
    description: String
  },
  { timestamps: true }
);

/**
 * validate function to check that the category inserted is already defined in the Category collection
 */
const validateCategory = async (name) => {
  return !!(await Category.findOne({
    name,
    deleted: false // in case I want to delete a category, I set it as deleted
  }));
};

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const featureSchema = new mongoose.Schema(
  {
    type: String,
    properties: {
      name: "string",
      url: "string",
      phone: "string",
      country: "string",
      address: "string",
      city: "string",
      category: {
        type: "string",
        validate: validateCategory
      },
      description: "string"
    },
    geometry: {
      type: pointSchema,
      required: true,
      index: "2dsphere" // Create a special 2dsphere index on `device.location`
    }
  },
  { timestamps: true }
);

const Feature = mongoose.model("feature", featureSchema);
module.exports = Feature;
