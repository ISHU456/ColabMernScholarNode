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
    console.log('--- PRIZES ---');
    console.log(JSON.stringify(prizes.map(p => ({ id: p._id, title: p.title, coins: p.coinsRequired, rank: p.rank })), null, 2));
    
    const students = await User.find({ role: 'student', coins: { $gt: 0 } });
    console.log('--- STUDENTS WITH COINS ---');
    console.log(JSON.stringify(students.map(s => ({ id: s._id, name: s.name, coins: s.coins })), null, 2));
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkData();
