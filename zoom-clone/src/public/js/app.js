const socket = io();
const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');
let roomName;

// IIFE
(function () {
  room.hidden = true;
})();

// message handler
const addMessage = (msg) => {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');

  console.log(msg);
  li.innerText = msg;
  ul.appendChild(li);
};

// welcome form submit event handler
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = form.querySelector('input');

  socket.emit('enter_room', input.value, () => {
    welcome.hidden = true;
    room.hidden = false;

    const h3 = room.querySelector('h3');

    h3.innerText = `${roomName}`;

    // 메시지 보내기 폼 submit 이벤트
    const msgForm = room.querySelector('#msg');
    msgForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = room.querySelector('#msg input');
      const value = input.value;
      socket.emit('new_message', input.value, roomName, () => {
        addMessage(`나 : ${value}`);
      });
      input.value = '';
    });

    // 닉네임 폼 submit 이벤트
    const nicknameForm = room.querySelector('#nickname');
    nicknameForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = room.querySelector('#nickname input');
      socket.emit('nickname', input.value);
    });
  });

  roomName = input.value;

  input.value = '';
});

socket.on('welcome', (user, userCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `방 ${roomName} 사람수 ${userCount}`;

  addMessage(`${user} joined!`);
});

socket.on('bye', (user, userCount) => {
  const h3 = room.querySelector('h3');
  h3.innerText = `방 ${roomName} 사람수 ${userCount}`;

  addMessage(`${user} left!`);
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';

  if (rooms.length) {
    rooms.forEach((room) => {
      const li = document.createElement('li');
      li.innerText = room;
      roomList.appendChild(li);
    });
    return;
  }
});
