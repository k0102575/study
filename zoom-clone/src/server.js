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

instrument(io, {
  auth: false,
});

httpServer.listen(PORT_NUMBER, () => {
  console.log(`start server ===> port: ${PORT_NUMBER}`);
});

const publicRooms = () => {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;

  const publicRooms = [];

  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });

  return publicRooms;
};

const countRoom = (roomName) => {
  return io.sockets.adapter.rooms.get(roomName)?.size;
};

io.on('connection', (socket) => {
  socket['nickname'] = 'Anon';

  // onAny event
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  // enter_room event
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();

    socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName));

    io.sockets.emit('room_change', publicRooms());
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit('bye', socket.nickname, countRoom(room) - 1);
    });
  });

  socket.on('disconnect', () => {
    io.sockets.emit('room_change', publicRooms());
  });

  socket.on('new_message', (msg, room, done) => {
    socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
});

/*
  Web Socket
*/
// // Web socket server start
// const wss = new WebSocket.Server({ server });

// // fake database
// const sockets = [];

// // Web socket event hander
// wss.on('connection', (socket) => {
//   sockets.push(socket);
//   socket['nickname'] = 'Anon';

//   // Web socket connection event
//   console.log('클라이언트와 연결 되었습니다. ✅');

//   // Web socket close event
//   socket.on('close', () => {
//     console.log('클라이언트와 연결이 끊겼습니다. ❌');
//   });

//   // Web socket receive message event
//   socket.on('message', (message) => {
//     const { type, payload } = JSON.parse(message);

//     switch (type) {
//       case 'new_message':
//         sockets.forEach((_socket) => {
//           _socket.send(`${socket.nickname} : ${payload}`);
//         });
//         break;

//       case 'nickname':
//         socket['nickname'] = payload;
//         break;
//     }
//   });
// });
