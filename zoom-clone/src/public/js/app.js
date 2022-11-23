const socket = new WebSocket(`ws://${window.location.host}`);

// Web socket connection event
socket.addEventListener('open', () => {
  console.log('서버와 연결 되었습니다. ✅');
});

// Web socket receive message event
socket.addEventListener('message', (message) => {
  console.log(`서버에서 온 새로운 메시지 : ${message.data}`);
});

// Web socket close event
socket.addEventListener('close', () => {
  console.log('서버와 연결이 끊겼습니다. ❌');
});

// Web socket send message event
setTimeout(() => {
  socket.send('안녕 서버야 😀');
}, 2000);
