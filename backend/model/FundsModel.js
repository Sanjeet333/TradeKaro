import mongoose from 'mongoose';

const FundsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    availableBalance: { type: Number, default: 100000 },
    usedMargin: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Funds', FundsSchema);
