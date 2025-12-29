const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json(restaurant);
};

exports.getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

exports.getRestaurantById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
};
