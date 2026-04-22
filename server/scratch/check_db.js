import mongoose from 'mongoose';
import Prize from '../models/Prize.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Ishu:ckYF42BmOagwPnQW@cluster0.mrkqa0t.mongodb.net/lms?retryWrites=true&w=majority');
    console.log('Connected to DB');
    
    const prizes = await Prize.find();
    console.log('Prizes in DB:', prizes.map(p => ({ id: p._id, title: p.title, coins: p.coinsRequired })));
    
    const students = await User.find({ role: 'student' });
    console.log('Students in DB:', students.map(s => ({ id: s._id, name: s.name, coins: s.coins })));
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkData();
