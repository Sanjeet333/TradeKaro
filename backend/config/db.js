import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('DB connected');
  } catch (err) {
    console.error('Connection Failed!', err);
  }
};

export default connectDB;
