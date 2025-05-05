import { io } from "socket.io-client";

// Make sure this matches your backend server's address
const socket = io("http://localhost:3000"); 

export default socket;