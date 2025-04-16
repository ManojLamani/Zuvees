// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [String],
  colors: [String],
  image: String,
});

module.exports = mongoose.model('Product', productSchema);
