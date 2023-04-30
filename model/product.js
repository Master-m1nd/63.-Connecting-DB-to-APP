import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    rating: Number,
    category: String,
    brand: String
  });

  const Product = mongoose.model('products', productSchema);

  export {Product, productSchema};