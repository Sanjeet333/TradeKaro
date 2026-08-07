import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    productType: { type: String, enum: ['CNC', 'MIS'], default: 'CNC' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
