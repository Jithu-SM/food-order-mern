const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const order = await Order.create({
    userId: req.user._id,
    items: req.body.items,
    totalAmount: req.body.totalAmount
  });

  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("userId", "username email");
  res.json(orders);
};

/* 🔥 ADDITIONAL NECESSARY API */
exports.cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = "Cancelled";
  await order.save();
  res.json({ message: "Order cancelled" });
};
