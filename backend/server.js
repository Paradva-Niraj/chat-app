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

app.use('/api/auth', authRoutes);
app.use('/api/search',searchRoutes);
app.use('/api/friends',friendRoute);

const server = http.createServer(app);


// old msg sahre to brod cast code 
const io = new Server(server,{
  cors:{
    origin:'*',
    methods:['GET','POST']
  },
});

io.on("connection",(socket)=>{
  socket.on("chat_message",(data)=>{
    io.emit("chat_message",{...data,from:socket.id})
  })
})
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