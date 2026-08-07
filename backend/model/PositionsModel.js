import mongoose from 'mongoose';

const PositionsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
  },
  { timestamps: true }
);

const Position = mongoose.model('Position', PositionsSchema);
export default Position;
