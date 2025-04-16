const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Rider route to view assigned orders
router.get('/orders/:riderId', async (req, res) => {
  try {
    const orders = await Order.find({ riderId: req.params.riderId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rider route to update order status to delivered
router.put('/orders/:id/deliver', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'Delivered';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
