const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  cancelOrder
} = require("../controllers/orderController");

router.post("/", auth, placeOrder);
router.get("/my-orders", auth, getMyOrders);
router.get("/", auth, role("admin"), getAllOrders);

/* additional */
router.put("/:id/cancel", auth, cancelOrder);

module.exports = router;
