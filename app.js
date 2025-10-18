const tracks = [
  { src: 'assets/audio/track1.mp3', title: 'Трек 1' },
  { src: 'assets/audio/track2.mp3', title: 'Трек 2' }
];

let currentTrack = 0;
const audioPlayer = document.getElementById('audioPlayer');
const trackTitle = document.getElementById('trackTitle');

function loadTrack(index) {
  const track = tracks[index];
  if (!track) return;
  audioPlayer.src = track.src;
  trackTitle.textContent = track.title;
}
loadTrack(currentTrack);

document.getElementById('prevBtn').addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

document.getElementById('playBtn').addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
});

// --- INSTALL APP ---
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  console.log('Install choice:', result.outcome);
  deferredPrompt = null;
  installBtn.hidden = true;
});

// --- SERVICE WORKER ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('✅ Service Worker Registered'))
    .catch(err => console.error('❌ SW failed:', err));
}
