const audioList = [
  { src: 'assets/audio/track1.mp3', title: 'Трек 1' },
  { src: 'assets/audio/track2.mp3', title: 'Трек 2' }
];

let index = 0;
const player = document.getElementById('player');

function loadTrack(i) {
  if (player) {
    player.src = audioList[i].src;
    player.play().catch(()=>{});
  }
}
loadTrack(index);

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + audioList.length) % audioList.length;
  loadTrack(index);
});

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % audioList.length;
  loadTrack(index);
});

// Install app
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
  installBtn.hidden = true;
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') console.log('App installed');
    deferredPrompt = null;
  }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('✅ Service Worker registered'))
    .catch(console.error);
}
