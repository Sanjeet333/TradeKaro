import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
import { startPriceBroadcasting } from './services/priceBroadcaster.js';
import { initSocketHandlers } from './sockets/socketHandler.js';

import authRoutes from './routes/authRoutes.js';
import holdingsRoutes from './routes/holdingsRoutes.js';
import positionsRoutes from './routes/positionsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import fundsRoutes from './routes/fundsRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import stocksRoutes from './routes/stocksRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(
  cors({
    origin: [
      'https://trade-karo-nine.vercel.app',
      'https://trade-karo-dashboard.vercel.app',
    ],
    credentials: true,
  })
);
app.use(express.json());

connectDB(process.env.MONGO_URL);

// Route mounting
app.use(authRoutes);
app.use(holdingsRoutes);
app.use(positionsRoutes);
app.use(ordersRoutes);
app.use(fundsRoutes);
app.use(watchlistRoutes);
app.use(stocksRoutes);
app.use(analyticsRoutes);
app.use(notificationsRoutes);
app.use('/api', contactRoutes);

initSocketHandlers(io);
startPriceBroadcasting(io);

server.listen(PORT, () => {
  console.log('App is listening');
});
