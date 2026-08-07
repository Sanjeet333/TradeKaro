import YahooFinance from 'yahoo-finance2';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const cache = new NodeCache({ stdTTL: 15 });

const stockList = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'nifty500.json'), 'utf-8')
);

export const getAllSymbols = () => stockList;

const fetchSingleQuote = async (symbol) => {
  try {
    const q = await yahooFinance.quote(`${symbol}.NS`);
    const data = {
      symbol,
      name: q.longName || q.shortName || symbol,
      price: q.regularMarketPrice ?? 0,
      change: q.regularMarketChange ?? 0,
      changePercent: q.regularMarketChangePercent ?? 0,
      dayHigh: q.regularMarketDayHigh ?? 0,
      dayLow: q.regularMarketDayLow ?? 0,
    };
    cache.set(symbol, data);
    return data;
  } catch (err) {
    console.error(`Yahoo Finance fetch error for ${symbol}:`, err.message);
    return null;
  }
};

export const getBatchQuotes = async (symbols) => {
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const cached = cache.get(symbol);
      if (cached) return cached;
      return await fetchSingleQuote(symbol);
    })
  );

  return results.filter(Boolean);
};
