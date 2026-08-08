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

// ========== CORS Configuration ==========
const allowedOrigins = [
  'https://trade-karo-nine.vercel.app',
  'https://trade-karo-dashboard.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
];

// ========== Express Setup ==========
const app = express();
const server = http.createServer(app);

// ========== Socket.io Server ==========
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },

  transports: ['websocket', 'polling'],
  // Socket.io specific settings
  path: '/socket.io',
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

// ========== Express CORS Middleware ==========
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// ========== Database Connection ==========
connectDB(process.env.MONGO_URL);

// ========== Route Mounting ==========
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

// ========== WebSocket Handlers ==========
initSocketHandlers(io);

// ========== Price Broadcasting ==========
startPriceBroadcasting(io);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// ========== Server Startup ==========
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.io CORS enabled for:`);
  allowedOrigins.forEach((origin) => console.log(`   - ${origin}`));
  console.log(`Transports: WebSocket + HTTP Polling`);
  console.log(`Database: Connected to MongoDB`);
  console.log(`Price broadcasting: Starting in 2 seconds...`);
});
