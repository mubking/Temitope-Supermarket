// src/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  size: String,
  price: Number,
  originalPrice: Number,
  category: String,
  categorySlug: String,
  discount: Number,
  image: String,
  rating: Number,
  reviews: Number,
newArrival: Boolean,
  inStock: Boolean,
  description: String,
  image: { type: String, default: "" },

}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
