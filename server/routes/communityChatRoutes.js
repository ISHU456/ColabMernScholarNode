import express from 'express';
import { getMessages, sendMessage } from '../controllers/communityChatController.js';
import { protect } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

router.get('/:courseId', protect, getMessages);
router.post('/:courseId', protect, upload.single('file'), sendMessage);

export default router;
