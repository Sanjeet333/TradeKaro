import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    symbols: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Watchlist', WatchlistSchema);
