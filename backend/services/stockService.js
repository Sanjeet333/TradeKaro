import Finnhub from 'finnhub';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const finnhub = new Finnhub.DefaultApi();
finnhub.apiKey = process.env.FINNHUB_API_KEY;

const cache = new NodeCache({ stdTTL: 10 });

const stockList = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'nifty500.json'), 'utf-8')
);

export const getAllSymbols = () => stockList;

const fetchSingleQuote = async (symbol) => {
  try {
    const quote = await finnhub.quote(symbol);
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

    // Check cache first
    const cachedResults = batch
      .map((symbol) => cache.get(symbol))
      .filter(Boolean);

    const uncachedSymbols = batch.filter((symbol) => !cache.get(symbol));

    results.push(...cachedResults);

    // Fetch uncached
    if (uncachedSymbols.length > 0) {
      const batchResults = await Promise.all(
        uncachedSymbols.map((symbol) => fetchSingleQuote(symbol))
      );
      results.push(...batchResults.filter(Boolean));

      // 100ms delay between batches
      if (i + batchSize < symbols.length) {
        await delay(100);
      }
    }
  }

  return results.filter(Boolean);
};
