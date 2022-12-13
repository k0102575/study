import express from 'express';
import ejs from 'ejs';
import http from 'http';
// import WebSocket from 'ws';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

// variables
const app = express();
const PORT_NUMBER = 3000;

// View template ejs Setting
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');

// Static file Setting
app.use('/public', express.static(__dirname + '/public'));

// Route Setting
app.get('/', (req, res) => res.render('index'));
app.get('/*', (req, res) => res.redirect('/'));

// server start
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  });

  socket.on('offer', (offer, roomName) => {
    socket.to(roomName).emit('offer', offer);
  });

  socket.on('answer', (answer, roomName) => {
    socket.to(roomName).emit('answer', answer);
  });

  socket.on('ice', (ice, roomName) => {
    socket.to(roomName).emit('ice', ice);
  });
});

instrument(io, {
  auth: false,
});

httpServer.listen(PORT_NUMBER, () => {
  console.log(`start server ===> port: ${PORT_NUMBER}`);
});
