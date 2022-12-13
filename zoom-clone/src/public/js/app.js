const socket = io();

const myVideo = document.getElementById('myVideo');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');
const welcome = document.getElementById('welcome');
const welcomeForm = welcome.querySelector('form');
const call = document.getElementById('call');
const peersStream = document.getElementById('peersStream');

let myStream;
let isMuted = false;
let isCamera = false;
let roomName;
let myPeerConnection;

// IIFE
(function () {
  call.hidden = true;
})();

// 카메라 정보 가져오는 함수
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    const currentCamera = myStream.getVideoTracks()[0];

    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.error(e);
  }
};

// 미디어 정보 가져오는 함수
const getMedia = async (deviceId) => {
  const initConstrains = {
    audio: true,
    video: { facingMode: 'user' },
  };

  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initConstrains
    );

    myVideo.srcObject = myStream;

    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.error(e);
  }
};

// connection 연결 함수
const makeConnection = () => {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  });

  myPeerConnection.addEventListener('icecandidate', (data) => {
    socket.emit('ice', data.candidate, roomName);
  });

  myPeerConnection.addEventListener('track', (data) => {
    peersStream.srcObject = data.streams[0];
  });

  myStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, myStream);
  });
};

const initCall = async () => {
  call.hidden = false;
  welcome.hidden = true;
  await getMedia();
  makeConnection();
};

// 소리 버튼 클릭 이벤트
muteBtn.addEventListener('click', () => {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));

  isMuted = !isMuted;
  muteBtn.innerText = `소리 ${isMuted ? 'ON' : 'OFF'}`;
});

// 카메라 버튼 클릭 이벤트
cameraBtn.addEventListener('click', () => {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));

  isCamera = !isCamera;
  cameraBtn.innerText = `카메라 ${isCamera ? 'ON' : 'OFF'}`;
});

camerasSelect.addEventListener('input', async () => {
  await getMedia(camerasSelect.value);

  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === 'video');
    videoSender.replaceTrack(videoTrack);
  }
});

// 방 입장 form submit 이벤트 리스너
welcomeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = welcomeForm.querySelector('input');
  roomName = input.value;

  await initCall();
  socket.emit('join_room', input.value);
  input.value = '';
});

socket.on('welcome', async () => {
  const offer = await myPeerConnection.createOffer();

  myPeerConnection.setLocalDescription(offer);

  socket.emit('offer', offer, roomName);
});

socket.on('offer', async (offer) => {
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();

  myPeerConnection.setLocalDescription(answer);

  socket.emit('answer', answer, roomName);
});

socket.on('answer', async (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', (ice) => {
  myPeerConnection.addIceCandidate(ice);
});
