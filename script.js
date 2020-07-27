const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs=['ekraat','believer','samebeef']; //song titles

let songIndex=2; //keep track of song

loadSong(songs[songIndex]);  //initially load song

function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}

//play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

//pause song
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

//previous song
function pervSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong(){
    songIndex++;

    if(songIndex > songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//updating progress
function progressUpdate(e){
    const { duration,currentTime }=e.srcElement;
    const progressPercentage = (currentTime/duration) * 100;
    progress.style.width = `${progressPercentage}%`
}

//set progress bar
function progressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime= (clickX/width)* duration;
}
//eventlistners

playBtn.addEventListener('click',() =>{
    const isPlaying=musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

//buttons eventlistners
prevBtn.addEventListener('click',pervSong);
nextBtn.addEventListener('click',nextSong);

//time/song update
audio.addEventListener('timeupdate',progressUpdate);

// set progress bar
progressContainer.addEventListener('click',progressBar);

//song ends
audio.addEventListener('ended',nextSong);