const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    return Product.create([
      {
        name: "Fan",
        description: "A powerful fan for summer.",
        price: 199.99,
        colors: ["Red", "Blue", "White"],
        sizes: ["Small", "Medium", "Large"],
        image: "https://example.com/fan.jpg",
      },
      {
        name: "Air Conditioner",
        description: "Efficient AC for your home.",
        price: 599.99,
        colors: ["White", "Silver"],
        sizes: ["Medium", "Large"],
        image: "https://example.com/ac.jpg",
      },
    ]);
  })
  .then(() => {
    console.log("Products added!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error adding products:", err);
    mongoose.disconnect();
  });
