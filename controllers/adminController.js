// controllers/adminController.js
const Order = require("../models/Order");
const Rider = require("../models/Rider");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, riderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    if (status === "Shipped" && riderId) {
      const rider = await Rider.findById(riderId);
      if (!rider) {
        return res.status(404).json({ message: "Rider not found" });
      }
      order.rider = rider;
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
