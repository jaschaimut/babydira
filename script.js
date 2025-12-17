document.addEventListener('DOMContentLoaded',()=>{
feather.replace();

const audio=document.getElementById('audio');
const playBtn=document.getElementById('play-pause');
const durationEl=document.getElementById('song-duration');
const lyricsEl=document.getElementById('lyrics-container');
const pages=document.querySelectorAll('.right-page');
const petalsContainer=document.querySelector('.petals');
const letterText=document.getElementById('letter-text');

let pageIndex=0,pageInterval,lyricInterval;

/* LIRIK ASLI (TIDAK DIUBAH) */
const lyrics=[
{time:0,text:"....."},
{time:3,text:"Dapatkah aku memeluknya?"},
{time:6,text:"Menjadikan bintang di surga"},
{time:9,text:"Memberikan warna yang bisa menjadikan indah"},
{time:16,text:"Aku tak mampu tuk mengatakan"},
{time:20,text:"Aku tak mampu tuk mengungkapkan"},
{time:23,text:"Hingga sampai saat ini, perasaan ku telah tertinggal"},
{time:30,text:"Dapatkah aku memeluknya?"},
{time:33,text:"Menjadikan bintang-bintang di surga"},
{time:37,text:"Memberikan warna yang bisa dan teruslah bisa menjadikan indah"},
{time:44,text:"....."}
];

/* LETTER */
const letter="Untuk kamu...\n\nJika halaman ini terbuka,\nitu berarti ada rasa\nyang tak pernah benar-benar pergi 🤍";
let i=0;
(function type(){
    if(i<letter.length){
        letterText.textContent+=letter[i++];
        setTimeout(type,45);
    }
})();

/* PLAY */
playBtn.onclick=()=>{
if(audio.paused){
audio.play();
playBtn.innerHTML='<i data-feather="pause"></i>';
feather.replace();
startBook();
syncLyrics();
}else{
audio.pause();
clearInterval(pageInterval);
clearInterval(lyricInterval);
playBtn.innerHTML='<i data-feather="play"></i>';
feather.replace();
}
};

/* BOOK */
function startBook(){
pageInterval=setInterval(()=>{
pages.forEach((p,i)=>{
p.style.transform=i<pageIndex?'rotateY(-180deg)':'rotateY(0)';
p.style.zIndex=pages.length-i;
});
pageIndex=(pageIndex+1)%pages.length;
},4200);
}

/* LYRICS */
function syncLyrics(){
lyricInterval=setInterval(()=>{
const t=Math.floor(audio.currentTime);
const l=lyrics.find(x=>x.time===t);
if(l) lyricsEl.textContent=l.text;
},1000);
}

/* TIME */
audio.ontimeupdate=()=>{
durationEl.textContent=format(audio.currentTime)+" / "+format(audio.duration);
};
function format(s){
const m=Math.floor(s/60);
const ss=Math.floor(s%60).toString().padStart(2,'0');
return `${m}:${ss}`;
}

/* PETALS */
function petal(){
const p=document.createElement('div');
p.className='petal';
p.style.left=Math.random()*100+'vw';
p.style.animationDuration=8+Math.random()*6+'s';
petalsContainer.appendChild(p);
setTimeout(()=>p.remove(),14000);
}
setInterval(petal,400);

});
