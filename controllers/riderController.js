// controllers/riderController.js
const Order = require("../models/Order");

exports.getAssignedOrders = async (req, res) => {
  try {
    const riderId = req.user.id; // Assuming user ID is stored in session

    const orders = await Order.find({ rider: riderId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Shipped") {
      return res.status(400).json({ message: "Order must be shipped to be delivered" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
