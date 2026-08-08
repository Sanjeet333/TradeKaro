import { getBatchQuotes } from './stockService.js';

const subscribedSymbols = new Set();
let isBroadcasting = false;

export const addSymbolsToTrack = (symbols) => {
  symbols.forEach((s) => {
    subscribedSymbols.add(s);
  });
};

export const sendImmediateQuotes = async (socket, symbols) => {
  try {
    const quotes = await getBatchQuotes(symbols);
    socket.emit('priceUpdate', quotes);
  } catch (err) {
    console.error('Immediate quote send error:', err);
  }
};

export const startPriceBroadcasting = (io) => {
  setInterval(async () => {
    if (subscribedSymbols.size === 0 || isBroadcasting) return;

    isBroadcasting = true;
    try {
      const quotes = await getBatchQuotes(Array.from(subscribedSymbols));
      if (quotes.length > 0) {
        io.emit('priceUpdate', quotes);
      }
    } catch (err) {
      console.error('Broadcast error:', err);
    } finally {
      isBroadcasting = false;
    }
  }, 10000);
};
