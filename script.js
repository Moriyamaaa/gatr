// List of songs and cover images
const playlist = [
    {
        title: "kisah tanpa dirimu x bawa dia kembali",
        audioSrc: "https://c.top4top.io/m_3178pdetc1.mp3", // Replace with actual URL from top4top.io
        coverSrc: "https://h.top4top.io/p_317888s610.jpg"
    },
    {
        title: "Song 2",
        audioSrc: "https://example.com/song2.mp3", // Replace with actual URL from top4top.io
        coverSrc: "https://example.com/cover2.jpg"
    },
    {
        title: "Song 3",
        audioSrc: "https://example.com/song3.mp3", // Replace with actual URL from top4top.io
        coverSrc: "https://example.com/cover3.jpg"
    }
];

// DOM elements
const trackList = document.getElementById("track-list");
const trackTitle = document.getElementById("track-title");
const trackCover = document.getElementById("track-cover");
const audioPlayer = document.createElement("audio"); // Create audio element dynamically
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const progressBar = document.getElementById('progress-bar');
const currentTimeElem = document.getElementById('current-time');
const totalDurationElem = document.getElementById('total-duration');

let currentTrackIndex = 0;
let isPlaying = false;

// Load the track list
function loadTrackList() {
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.addEventListener('click', () => loadTrack(index));
        trackList.appendChild(li);
    });
}

// Load the track
function loadTrack(index) {
    currentTrackIndex = index;
    const track = playlist[index];
    trackTitle.textContent = track.title;
    trackCover.src = track.coverSrc;
    audioPlayer.src = track.audioSrc;
    resetProgressBar();
}

// Play or pause the track
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
}

// Update play/pause icon
function updatePlayPauseIcon() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Play next track
function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseIcon();
}

// Play previous track
function playPrev() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseIcon();
}

// Reset progress bar and time
function resetProgressBar() {
    progressBar.value = 0;
    currentTimeElem.textContent = '0:00';
    totalDurationElem.textContent = '0:00';
}

// Update progress bar and time display
function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    if (isNaN(duration)) return; // Return if duration is not yet available
    progressBar.value = (currentTime / duration) * 100;

    // Update current time
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeElem.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // Update total duration
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    totalDurationElem.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
}

// Seek to a specific time in the track
function seekTrack() {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
audioPlayer.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', seekTrack);

// Load the initial track list and track
loadTrackList();
loadTrack(currentTrackIndex);