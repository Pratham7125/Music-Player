let play_btn = document.querySelector("#play");
let progress = document.querySelector("#progress");
let pre = document.querySelector("#pre");
let next = document.querySelector("#next");
let title = document.getElementById("title");
let track_image = document.querySelector("img");
let artist = document.getElementById("artist");
const progress_container = document.getElementById("progress-container");
let total_time = 0;
let currentTime = 0;
let isPlaying = false;
let song = document.querySelector('audio');
const music=
[{
    name:"A",
    title:"Meant to Be",
    img: "images/me.png",
    artist:"Bebe Rexha",
},
{
    name:"B",
    title:"Sober",
    img: "images/so.jpg",
    artist:"Geazy"
},
{
    name:"C",
    title:"Sunflower",
    img: "images/s.jpg",
    artist:"Post Malone"
},
{
    name:"D",
    title:"Mia",
    img: "images/Mi.png",
    artist:"Drake",
}]

songindex=0;
const loadsong=(songindex)=>{
    song.src="sound/"+music[songindex].name+".mp3";
    title.innerHTML = music[songindex].title;
    track_image.src=music[songindex].img;
    artist.innerHTML=music[songindex].artist;
}
const playfunction=()=>{
    song.play();
    isPlaying = true;
    total_time = song.duration;
}
const pausefunction=()=>{
    song.pause();
    isPlaying = false;
}

const nextsong=()=>{
    songindex=(songindex+1)%music.length;
    loadsong(songindex);
    playfunction();
}

const presong=()=>{
    songindex=(songindex-1 + music.length)%music.length;
    loadsong(songindex);
    playfunction();
}

play.addEventListener("click",()=>{
    if(!isPlaying){
        playfunction();
    }
    else{
        pausefunction();
    }
})

next.addEventListener("click",nextsong);
pre.addEventListener("click",presong);

song.addEventListener("timeupdate",(event)=>{
    const{currentTime,duration}=event.target;
    let progressTime=(currentTime/duration)*100;
    progress.style.width=`${progressTime}%`;
})

progress_container.addEventListener('click',(event)=>{
    const{duration}=song;
    let move_progress=(event.offsetX/event.target.clientWidth)*duration;
    song.currentTime=move_progress;
})

song.addEventListener('ended',()=>{
    song.currentTime = 0
    song.pause();
    isPlaying = false;
})