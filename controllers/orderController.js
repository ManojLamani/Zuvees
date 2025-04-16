const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  const newOrder = new Order({
    products,
    totalAmount,
    status: "Paid", // Default status is "Paid"
  });

  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
