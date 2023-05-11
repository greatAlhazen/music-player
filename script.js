// select all required elements and specify custom variable
const audio = document.getElementById("audio");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.getElementById("image");
const currentTimeElement = document.getElementById("current");
const durationElement = document.getElementById("duration");
const progress = document.getElementById("progress");
let isPLaying;
let currentSong = 2;

// musics array
const musics = [
  {
    name: "music-1",
    showName: "My-universe",
    artist: "Nesterouk",
  },
  {
    name: "music-2",
    showName: "Futuristic beat",
    artist: "RoyaltyFreeMusic",
  },
  {
    name: "music-3",
    showName: "Echo technology",
    artist: "Lexin_Music",
  },
  {
    name: "music-4",
    showName: "Ambient classical guitar",
    artist: "William_king",
  },
];

// play song, change isPlaying,title attribute and icon
function songPlay() {
  isPLaying = true;
  play.classList.replace("fa-play", "fa-pause");
  play.setAttribute("title", "pause");
  audio.play();
}
// pause song, change isPlaying,title attribute and icon
function pausePLay() {
  isPLaying = false;
  play.classList.replace("fa-pause", "fa-play");
  play.setAttribute("title", "pause");
  audio.pause();
}

// play or pause song according to isPLaying variable
play.addEventListener("click", () => (isPLaying ? pausePLay() : songPlay()));

// change ui according to playing music
const loadMusic = (music) => {
  title.textContent = music.showName;
  artist.textContent = music.artist;
  audio.src = `musics/${music.name}.mp3`;
  image.src = `img/${music.name}.jpg`;
  durationElement.textContent = "2:02";
};

// first load
loadMusic(musics[currentSong]);

// disbale next icon
function nextDisbale(value) {
  if (value === "disable") {
    next.style.opacity = "0.5";
    next.style.pointerEvents = "none";
  } else {
    next.style.opacity = "1";
    next.style.pointerEvents = "auto";
  }
}

// disable prev icon
function prevDisbale(value) {
  if (value === "disable") {
    prev.style.opacity = "0.5";
    prev.style.pointerEvents = "none";
  } else {
    prev.style.opacity = "1";
    prev.style.pointerEvents = "auto";
  }
}

// play next music and specify disabled part
function nextMusic() {
  if (currentSong === 2) {
    nextDisbale("disable");
  } else {
    prevDisbale("notDisable");
    nextDisbale("notDisable");
  }
  currentSong += 1;
  loadMusic(musics[currentSong]);
  songPlay();
}

// pause next music and specify disabled part
function prevMusic() {
  if (currentSong === 1) {
    prevDisbale("disable");
  } else {
    nextDisbale("notDisable");
    prevDisbale("notDisable");
  }
  currentSong -= 1;
  loadMusic(musics[currentSong]);
  songPlay();
}

// next and prev click event
next.addEventListener("click", nextMusic);
prev.addEventListener("click", prevMusic);

//
function timeUpdate(e) {
  if (isPLaying) {
    // get and specify time music is in
    const { duration, currentTime } = e.srcElement;
    const time = (currentTime / duration) * 100;
    progress.style.setProperty("--width", time);
    // get and specify duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }
    if (durationSecond) {
      durationElement.textContent = `${durationMinutes}:${durationSecond}`;
    }

    // get and specify current time
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSecond = Math.floor(currentTime % 60);
    if (currentTimeSecond < 10) {
      currentTimeSecond = `0${currentTimeSecond}`;
    }
    if (currentTimeSecond) {
      currentTimeElement.textContent = `${currentTimeMinutes}:${currentTimeSecond}`;
    }
  }
}
// time update event
audio.addEventListener("timeupdate", timeUpdate);

// progress click functionlity
function progressClick(e) {
  const clickX = e.offsetX;
  const width = this.clientWidth;
  audio.currentTime = (clickX / width) * audio.duration;
}

// progress click event
progress.addEventListener("click", progressClick);

// ended music functionality
function endedMusic() {
  if (currentSong === 3) {
    currentSong = 0;
    prevDisbale("disable");
    nextDisbale("notDisable");
    loadMusic(musics[currentSong]);
    songPlay();
  } else {
    nextMusic();
  }
}

// ended event
audio.addEventListener("ended", endedMusic);
