import mongoose from 'mongoose';

const communityMessageSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: false },
  attachment: {
    url: String,
    type: { type: String, enum: ['image', 'pdf', 'other'] },
    name: String
  },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const CommunityMessage = mongoose.model('CommunityMessage', communityMessageSchema);
export default CommunityMessage;
