const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
