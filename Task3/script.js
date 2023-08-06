let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show=document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;

//  create audio Element
let track = document.createElement('audio');


// songs list
let All_song=[
    {
        name:"first song",
        path:"/Users/omgarg/Desktop/internship/Project Music/songs/song1.mp3",
        img: "https://i.ytimg.com/vi/eQRmLKveP5A/maxresdefault.jpg",
        singer: "first singer"
    },
    {
        name:"second song",
        path:"/Users/omgarg/Desktop/internship/Project Music/songs/song2.mp3",
        img:"https://i.scdn.co/image/ab67616d0000b273bbda2325afa7cfda80ccd856",
        singer:"second singer"
    },
    {
        name:"third song",
        path:"/Users/omgarg/Desktop/internship/Project Music/songs/song3.mp3",
        img:"https://i.scdn.co/image/ab67616d0000b2735fb82d91434b878472eb26d0",
        singer:"third singer"
    },
    {
        name:"fourt song",
        path:"/Users/omgarg/Desktop/internship/Project Music/songs/song4.mp3",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvGjiASgnFmgIFud2vUhWxpe8wH0-PaZadQ&usqp=CAU",
        singer:"fourth singer"
    },
    {
        name:"fifth song",
        path:"/Users/omgarg/Desktop/internship/Project Music/songs/song5.mp3",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM6CK7TrFAmKISCyTUrShqrz527V8c1UCOUzFTDZffkj8ymKY3remM3Zj76eLtNWbRlbI&usqp=CAU",
        singer:"fifth singer"
    }
];


function load_track(index_no){
    clearInterval(timer);
    reset_slider()
    track.src=All_song[index_no].path;
    title.innerHTML=All_song[index_no].name;
    track_image.src=All_song[index_no].img;
    artist.innerHTML=All_song[index_no].singer;
    track.load();

    total.innerHTML=All_song.length;
    present.innerHTML=index_no+1;
    timer-setInterval(range_slider,1000);
}
load_track(index_no);


//mute sound
function mute_sound(){
    track.volume=0;
    volume.value=0;
    volume_show.innerHTML=0;
}
//reset song slider
function reset_slider(){
    slider.value = 0;
}

function justplay(){
    if(playing_song==false){
        playsong();
    }
    else{
        pausesong();
    }
}

// play song
function playsong(){
    track.play();
    playing_song=true;
    play.innerHTML='<i class="fa fa-pause"></i>';
}
// pause song
function pausesong(){
    track.pause();
    playing_song=false;
    play.innerHTML='<i class="fa fa-play"></i>';

}

// next song 
function next_song(){
    if(index_no<All_song.length-1){
        index_no +=1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no=0;
        load_track(index_no);
        playsong();
    }
}

//previous song
function previous_song(){
    if(index_no>0){
        index_no-=1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no=All_song.length;
        load_track(index_no);
        playsong();
    }
}


//change volume
function  volume_change(){
volume_show.innerHTML=recent_volume.value;
track.volume=recent_volume.value / 100;
}

// change slider position
function change_duration(){
    slider_position=track.duration*(slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay function
function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background="rgba(255,255,255,0.2)";
    }
    else{
        autoplay=1;
        auto_play.style.background="#FF8A65";
    }
}

function range_slider(){
    let position=0;
    if(!isNaN(track.duration)){
        position=track.currentTime * (100/track.duration);
        slider.value =position;
    }


    //function will run when song is over
    if(track.ended){
        play.innerHTML='<i class="fa fa-play"></i>';
        if(autoplay==1){
            index_no+=1;load_track(index_no);
            playsong();
        }
    }
}