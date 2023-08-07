const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Clothing', 'Electronics', 'Furniture', 'Other'],
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String, 
    default: true,
  },
  postedAt: {
    type: Date, 
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },

}, {
  timestamps: true,
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
