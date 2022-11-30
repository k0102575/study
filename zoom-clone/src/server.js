import express from 'express';
import ejs from 'ejs';
import http from 'http';
import WebSocket from 'ws';

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

// Http server start
const server = http.createServer(app);
server.listen(PORT_NUMBER, () => {
  console.log(`start server ===> port: ${PORT_NUMBER}`);
});

// Web socket server start
const wss = new WebSocket.Server({ server });

// fake database
const sockets = [];

// Web socket event hander
wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Anon';

  // Web socket connection event
  console.log('클라이언트와 연결 되었습니다. ✅');

  // Web socket close event
  socket.on('close', () => {
    console.log('클라이언트와 연결이 끊겼습니다. ❌');
  });

  // Web socket receive message event
  socket.on('message', (message) => {
    const { type, payload } = JSON.parse(message);

    switch (type) {
      case 'new_message':
        sockets.forEach((_socket) => {
          _socket.send(`${socket.nickname} : ${payload}`);
        });
        break;

      case 'nickname':
        socket['nickname'] = payload;
        break;
    }
  });
});
