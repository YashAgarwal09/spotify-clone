console.log("Welcome to spotify");
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let songs = [
  {
    songName: "Warriyo",
    filepath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Ceilo",
    filepath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Deaf Kev",
    filepath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Different Heaven",
    filepath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
];

songItems.forEach((element, i) => {
  console.log(element, i);

  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

//listen to events
audioElement.addEventListener("timeupdate", () => {
  //update seek bar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      //   console.log(songIndex);

      //   songIndex = parseInt(e.target.id);
      console.log(songIndex);
      if (e.target.classList.contains("fa-circle-play")) {
        makeAllPlays();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/` + songIndex + `.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      } else {
        e.target.classList.add("fa-circle-play");
        e.target.classList.remove("fa-circle-pause");
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 3) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/` + songIndex + `.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 1) {
    songIndex = 4;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/` + songIndex + `.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
