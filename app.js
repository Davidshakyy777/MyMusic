const playlist = [
  {src: 'assets/audio/track1.mp3', title: 'Трек 1'},
  {src: 'assets/audio/track2.mp3', title: 'Трек 2'},
  {src: 'assets/audio/track3.mp3', title: 'Трек 3'}
];

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;

function loadTrack(i) {
  audio.src = playlist[i].src;
  title.textContent = playlist[i].title;
}

prev.addEventListener('click', () => {
  index = (index - 1 + playlist.length) % playlist.length;
  loadTrack(index);
  audio.play();
});

next.addEventListener('click', () => {
  index = (index + 1) % playlist.length;
  loadTrack(index);
  audio.play();
});

loadTrack(index);

// PWA Install
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
  installBtn.style.display = 'none';
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  if (result.outcome === 'accepted') {
    console.log('App installed');
  }
});

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('✅ Service Worker registered'))
    .catch(err => console.error('❌ SW failed:', err));
}
