import Watchlist from '../model/WatchlistModel.js';

export const getWatchlist = async (req, res) => {
  try {
    let wl = await Watchlist.findOne({ userId: req.userID });
    if (!wl) {
      wl = await Watchlist.create({ userId: req.userID, symbols: [] });
    }
    res.json(wl.symbols);
  } catch (err) {
    console.error('Watchlist fetch error', err);
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) {
      return res.status(400).json({ error: 'Symbol required' });
    }
    let wl = await Watchlist.findOne({ userId: req.userID });
    if (!wl) {
      wl = await Watchlist.create({ userId: req.userID, symbols: [symbol] });
    } else if (!wl.symbols.includes(symbol)) {
      wl.symbols.push(symbol);
      await wl.save();
    }
    res.json(wl.symbols);
  } catch (err) {
    console.error('Watchlist add error:', err);
    res.status(500).json({ error: 'Failed to add symbol' });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) {
      return res.status(400).json({ error: 'Symbol required' });
    }
    const wl = await Watchlist.findOne({ userId: req.userID });
    if (wl) {
      wl.symbols = wl.symbols.filter((s) => s !== symbol);
      await wl.save();
    }
    res.json(wl ? wl.symbols : []);
  } catch (err) {
    console.error('Watchlist remove error:', err);
    res.status(500).json({ error: 'Failed to remove symbol' });
  }
};
