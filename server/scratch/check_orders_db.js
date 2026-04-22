import mongoose from 'mongoose';
import Order from '../models/Order.js';
import dotenv from 'dotenv';
dotenv.config();

const checkOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const count = await Order.countDocuments();
    console.log(`Total Orders: ${count}`);
    const orders = await Order.find().limit(5);
    console.log("Recent Orders:", JSON.stringify(orders, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkOrders();
