const audio = document.getElementById("audio");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.getElementById("image");
const currentTimeElement = document.getElementById("current");
const durationElement = document.getElementById("duration");
let isPLaying;

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

function songPlay() {
  isPLaying = true;
  play.classList.replace("fa-play", "fa-pause");
  play.setAttribute("title", "pause");
  audio.play();
}
function pausePLay() {
  isPLaying = false;
  play.classList.replace("fa-pause", "fa-play");
  play.setAttribute("title", "pause");
  audio.pause();
}

play.addEventListener("click", () => (isPLaying ? pausePLay() : songPlay()));

const loadMusic = (music) => {
  title.textContent = music.showName;
  artist.textContent = music.artist;
  audio.src = `musics/${music.name}.mp3`;
  image.src = `img/${music.name}.jpg`;
  durationElement.textContent = "2:02";
};

loadMusic(musics[2]);
