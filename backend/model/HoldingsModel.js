import mongoose from 'mongoose';

const HoldingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
  },
  { timestamps: true }
);

const Holding = mongoose.model('Holding', HoldingsSchema);
export default Holding;
