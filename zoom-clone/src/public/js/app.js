const messageList = document.querySelector('ul');
const nicknameForm = document.querySelector('#nicknameForm');
const messageForm = document.querySelector('#messageForm');
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

// Web socket connection event
socket.addEventListener('open', () => {
  console.log('서버와 연결 되었습니다. ✅');
});

// Web socket receive message event
socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

// Web socket close event
socket.addEventListener('close', () => {
  console.log('서버와 연결이 끊겼습니다. ❌');
});

// nickname Form submit Event
nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
});

// Message Form submit event
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = messageForm.querySelector('input');

  socket.send(makeMessage('new_message', input.value));
  const li = document.createElement('li');
  li.innerText = `You: ${input.value}`;
  messageList.append(li);

  input.value = '';
});
