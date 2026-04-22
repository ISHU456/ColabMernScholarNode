import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  coinsRequired: { type: Number, required: true },
  rank: { type: Number, default: 0 }, // For ordering
  stock: { type: Number, default: -1 }, // -1 for infinite
  category: { type: String, enum: ['ACCESSORY', 'EQUIPMENT', 'BADGE', 'OTHER'], default: 'OTHER' }
}, { timestamps: true });

const Prize = mongoose.model('Prize', prizeSchema);
export default Prize;
