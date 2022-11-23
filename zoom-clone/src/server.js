import express from 'express';
import ejs from 'ejs';
import http from 'http';
import WebSocket from 'ws';

// variables
const app = express();
const PORT_NUMBER = 3000;

// view template ejs Setting
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');

// Route Setting
app.get('/', (req, res) => res.render('index'));
app.get('/*', (req, res) => res.redirect('/'));

// static file Setting
app.use('/public', express.static(__dirname + '/public'));

// callback
const handleListen = () => {
  console.log(`start server ===> port: ${PORT_NUMBER}`);
};

// express server start
// app.listen(PORT_NUMBER, '', handleListen);

// Web socket server start
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(PORT_NUMBER, handleListen);
