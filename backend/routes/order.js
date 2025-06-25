// routes/order.js
import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

// Mongoose Order schema
const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  paymentMethod: String,
  cardNumber: String,
  cardExpiry: String,
  cardCvc: String,
  items: Array,
  total: String,
  orderDate: Date
});

const Order = mongoose.model('Order', orderSchema);

// POST route for saving order
router.post('/checkout', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while saving the order.' });
  }
});

export default router;
