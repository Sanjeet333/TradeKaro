import { io } from 'socket.io-client';

const socket = io('https://tradekaro-backend.onrender.com', {
  autoConnect: false,
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

export default socket;
