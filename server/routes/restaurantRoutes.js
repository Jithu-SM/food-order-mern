const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createRestaurant,
  getRestaurants,
  getRestaurantById
} = require("../controllers/restaurantController");

router.post("/", auth, role("admin"), createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

module.exports = router;
