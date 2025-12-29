const FoodItem = require("../models/FoodItem");

exports.addFood = async (req, res) => {
  const food = await FoodItem.create(req.body);
  res.status(201).json(food);
};

exports.getFoodByRestaurant = async (req, res) => {
  const foods = await FoodItem.find({
    restaurantId: req.params.restaurantId
  });
  res.json(foods);
};
