import CommunityMessage from '../models/CommunityMessage.js';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

// Helper to resolve courseId (could be an ID or a Code)
const resolveCourseId = async (input) => {
  if (mongoose.Types.ObjectId.isValid(input)) {
    return input;
  }
  const course = await Course.findOne({ code: input.toUpperCase() });
  return course ? course._id : null;
};

export const getMessages = async (req, res) => {
  try {
    const { courseId: rawId } = req.params;
    const courseId = await resolveCourseId(rawId);
    
    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const messages = await CommunityMessage.find({ course: courseId })
      .populate('sender', 'name role profilePicture')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { courseId: rawId } = req.params;
    const courseId = await resolveCourseId(rawId);
    
    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { content } = req.body;
    
    const messageData = {
      course: courseId,
      sender: req.user._id,
      content
    };

    if (req.file) {
      const fileType = req.file.mimetype.includes('image') ? 'image' : 
                      req.file.mimetype.includes('pdf') ? 'pdf' : 'other';
      messageData.attachment = {
        url: req.file.path,
        type: fileType,
        name: req.file.originalname
      };
    }

    const newMessage = new CommunityMessage(messageData);
    await newMessage.save();
    
    const populatedMessage = await newMessage.populate('sender', 'name role profilePicture');
    
    if (req.io) {
      // Use rawId (the one the client is subscribed to, e.g. "CS301") for the socket room
      req.io.to(rawId).emit('new-community-message', populatedMessage);
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
