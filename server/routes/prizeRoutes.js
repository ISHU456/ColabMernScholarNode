import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import Prize from '../models/Prize.js';

const router = express.Router();

// Get all prizes
router.get('/', protect, async (req, res) => {
  try {
    const prizes = await Prize.find({}).sort({ rank: 1 });
    res.json(prizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create prize (Admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const prize = await Prize.create(req.body);
    res.status(201).json(prize);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update prize (Admin)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const prize = await Prize.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(prize);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
