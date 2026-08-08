import axios from 'axios';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

const cache = new NodeCache({ stdTTL: 10 });

let stockList = [];
try {
  stockList = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '..', 'data', 'nifty500.json'),
      'utf-8'
    )
  );
} catch (err) {
  console.error('Failed to load nifty500.json:', err.message);
}

export const getAllSymbols = () => stockList;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchSingleQuote = async (symbol) => {
  try {
    const response = await axios.get(`${FINNHUB_BASE_URL}/quote`, {
      params: { symbol, token: FINNHUB_API_KEY },
      timeout: 5000,
    });

    const quote = response.data;

    // Finnhub returns all zeros for invalid/unsupported symbols
    if (!quote || (quote.c === 0 && quote.pc === 0)) {
      throw new Error('Invalid or empty quote data');
    }

    const data = {
      symbol,
      name: symbol,
      price: quote.c ?? 0,
      change: quote.d ?? 0,
      changePercent: quote.dp ?? 0,
      dayHigh: quote.h ?? 0,
      dayLow: quote.l ?? 0,
      open: quote.o ?? 0,
      previousClose: quote.pc ?? 0,
    };
    cache.set(symbol, data);
    return data;
  } catch (err) {
    console.error(`Finnhub fetch error for ${symbol}:`, err.message);
    const cached = cache.get(symbol);
    return cached || null;
  }
};

export const getBatchQuotes = async (symbols) => {
  const batchSize = 10;
  const results = [];

  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);

    const cachedResults = batch
      .map((symbol) => cache.get(symbol))
      .filter(Boolean);

    const uncachedSymbols = batch.filter((symbol) => !cache.get(symbol));

    results.push(...cachedResults);

    if (uncachedSymbols.length > 0) {
      const batchResults = await Promise.all(
        uncachedSymbols.map((symbol) => fetchSingleQuote(symbol))
      );
      results.push(...batchResults.filter(Boolean));

      if (i + batchSize < symbols.length) {
        await delay(100);
      }
    }
  }

  return results.filter(Boolean);
};
