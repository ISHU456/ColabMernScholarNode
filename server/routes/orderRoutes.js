import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import Order from '../models/Order.js';
import Prize from '../models/Prize.js';
import User from '../models/User.js';

const router = express.Router();

// Get my orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (Admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order (Redeem)
router.post('/', protect, async (req, res) => {
  try {
    const { prizeId } = req.body;
    const prize = await Prize.findById(prizeId);
    if (!prize) return res.status(404).json({ message: 'Prize not found' });

    const user = await User.findById(req.user._id);
    if (user.coins < prize.coinsRequired) {
      return res.status(400).json({ message: 'Insufficient Scholar Coins' });
    }

    // Deduct coins
    user.coins -= prize.coinsRequired;
    await user.save();

    const order = await Order.create({
      user: user._id,
      prize: prize._id,
      cost: prize.coinsRequired,
      prizeTitle: prize.title,
      prizeImage: prize.image,
      userName: user.name,
      userEmail: user.email
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status (Admin)
router.patch('/:id', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
