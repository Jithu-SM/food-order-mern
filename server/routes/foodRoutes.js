const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  addFood,
  getFoodByRestaurant
} = require("../controllers/foodController");

router.post("/", auth, role("admin"), addFood);
router.get("/restaurant/:restaurantId", getFoodByRestaurant);

module.exports = router;
