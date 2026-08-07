import {
  addSymbolsToTrack,
  sendImmediateQuotes,
} from '../services/priceBroadcaster.js';

export const initSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    socket.on('subscribe', (symbols) => {
      addSymbolsToTrack(symbols);
      sendImmediateQuotes(socket, symbols);
    });
  });
};
