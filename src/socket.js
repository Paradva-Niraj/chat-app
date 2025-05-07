import { io } from "socket.io-client";

// Create a single socket instance with error handling
const socketURL = import.meta.env.VITE_PORT || 'http://localhost:3000';
console.log("Connecting to socket server at:", socketURL);

const socket = io(socketURL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000
});

// Add event listeners for debugging
socket.on('connect', () => {
  console.log('Socket connected successfully with ID:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

export default socket;