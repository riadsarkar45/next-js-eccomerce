const mongoose = require('mongoose');

const CartSyncSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
  productId: {
    type: String,
    required: true,
  },
  productImg: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Optional: to track when the item was added/updated
});

const CartItem = mongoose.model('CartItems', CartSyncSchema);
module.exports = CartItem;
