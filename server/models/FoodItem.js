const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  }
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
