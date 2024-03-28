/**
 * Represents a music player with functionalities to play, pause, skip tracks, and update progress.
 * @module MusicPlayer
 */

// DOM Elements
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

/**
 * Array of songs with their details.
 * @type {Array<Object>}
 */
const songs = [
  {
    name: 'dusko-1',
    displayName: 'Shock Forward Drum',
    artist: 'Dusko Design',
  },
  {
    name: 'dusko-2',
    displayName: 'Seven Lakes Army (Remix)',
    artist: 'Dusko Design',
  },
  {
    name: 'dusko-3',
    displayName: 'Goodnight, Nighty',
    artist: 'Dusko Design',
  },
  {
    name: 'dusko-4',
    displayName: 'Front Dev (Remix)',
    artist: 'Excentric/Dusko Design',
  },
  {
    name: 'dusko-5',
    displayName: 'Back Row (Total Remix)',
    artist: 'Excentric/Dusko Design',
  },
  {
    name: 'dusko-6',
    displayName: 'Hooray Lady',
    artist: 'Excentric/Dusko Design',
  },
  {
    name: 'dusko-7',
    displayName: 'Dark Side (Remix)',
    artist: 'Excentric/Dusko Design',
  },
  {
    name: 'dusko-8',
    displayName: 'Holly Molly (Remix)',
    artist: 'Excentric/Dusko Design',
  },
  {
    name: 'dusko-9',
    displayName: 'Funny Bunny',
    artist: 'Excentric/Dusko Design',
  },
  {
    name: 'dusko-10',
    displayName: 'Soldier Metal',
    artist: 'Excentric/Dusko Design',
  },
  {
    name: 'dusko-11',
    displayName: 'Buy Me a Coffee',
    artist: 'Excentric/Dusko Design',
  },
];

/**
 * Boolean to check if the music is playing.
 * @type {boolean}
 */
let isPlaying = false;

/**
 * Function to play the song.
 */
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

/**
 * Function to pause the song.
 */
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

/**
 * Function to load the song details to the DOM.
 * @param {Object} song - The song to load.
 */
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

/**
 * Index of the current song.
 * @type {number}
 */
let songIndex = 0;

/**
 * Function to play the previous song.
 */
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

/**
 * Function to play the next song.
 */
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

/**
 * Function to update the progress bar and time.
 * @param {Event} e - The event.
 */
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

/**
 * Function to set the progress bar.
 * @param {Event} e - The event.
 */
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
