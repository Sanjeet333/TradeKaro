import { getAllSymbols, getBatchQuotes } from '../services/stockService.js';

export const getStockList = (req, res) => {
  try {
    const symbols = getAllSymbols();
    res.json(symbols);
  } catch (err) {
    console.error('Stock list error', err);
    res.status(500).json({ error: 'Failed to fetch stock list' });
  }
};

export const getStockQuotes = async (req, res) => {
  try {
    const { symbols } = req.body;
    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return res.status(400).json({ error: 'symbols array required' });
    }
    const data = await getBatchQuotes(symbols);
    res.json(data);
  } catch (err) {
    console.error('Quotes fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
};
