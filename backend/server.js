const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();


//routers 
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const friendRoute = require('./routes/friends');

app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/search',searchRoutes);
app.use('/api/friends',friendRoute);

const server = http.createServer(app);

const users = {}; 
// old msg sahre to brod cast code 
const io = new Server(server,{
  cors:{
    origin:'*',
    methods:['GET','POST']
  },
});

io.on('connection', (socket) => {
  // console.log(`New connection: ${socket.id}`);
  
  // Register user ID with socket ID
  socket.on('register', (userId) => {
    // console.log(`User ${userId} registered with socket ${socket.id}`);
    users[userId] = socket.id;
  });

  // Handle private messages
  socket.on('private_message', ({ to, from, text }) => {
    // console.log(`Private message from ${from} to ${to}: ${text}`);
    
    // Get the recipient's socket ID
    const targetSocketId = users[to];
    
    if (targetSocketId) {
      // Send the message to the recipient
      io.to(targetSocketId).emit('private_message', { from, to, text });
      // console.log(`Message sent to socket ${targetSocketId}`);
    } else {
      console.log(`User ${to} is not connected or not found`);
      // Optionally, send a notification back to the sender
      socket.emit('message_status', { 
        messageId: Date.now(), 
        status: 'pending',
        error: 'Recipient not online'
      });
    }
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    // console.log(`Socket disconnected: ${socket.id}`);
    // Remove user from the users object
    for (const userId in users) {
      if (users[userId] === socket.id) {
        // console.log(`User ${userId} disconnected`);
        delete users[userId];
        break;
      }
    }
  });
});

// io.on("connection",(socket)=>{
//   socket.on("chat_message",(data)=>{
//     io.emit("chat_message",{...data,from:socket.id})
//   })
// })
// end of brod cast

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));




const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
  console.log("server");
})