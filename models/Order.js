const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      size: String,
      color: String,
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ['Paid', 'Shipped', 'Delivered'], default: 'Paid' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
