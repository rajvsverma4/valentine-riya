let bgAudio = document.getElementById("bgAudio");
let bklAudio = document.getElementById("bklAudio");

let wnVideo = document.getElementById("wnVideo");
let mkcVideo = document.getElementById("mkcVideo");

let slider = document.getElementById("slider");
let sliderText = document.getElementById("sliderText");

let overlay = document.getElementById("overlayText");


let no1Count=0;
let no2Count=0;
let no3Count=0;


// Unlock audio on first click
document.body.addEventListener("click",()=>{
  if(bgAudio.paused){
    bgAudio.volume=0.4;
    bgAudio.play();
  }
},{once:true});


/* Helpers */

function show(id){

  document.querySelectorAll(".screen")
  .forEach(s=>s.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}


function jump(btn){

  btn.style.position="fixed";

  let x=Math.random()*(window.innerWidth-100);
  let y=Math.random()*(window.innerHeight-100);

  btn.style.left=x+"px";
  btn.style.top=y+"px";
}


/* Screen 1 */

function yes1(){
  show("s2");
}

function no1(){

  no1Count++;

  jump(document.getElementById("no1"));

  if(no1Count>=10){
    yes1();
  }
}


/* Screen 2 */

function yes2(){
  show("s3");
}

function no2(){

  no2Count++;

  jump(document.getElementById("no2"));

  if(no2Count>=5){
    yes2();
  }
}


/* Screen 3 */

function yes3(){
  show("s4");
}

function no3(){

  no3Count++;

  jump(document.getElementById("no3"));

  if(no3Count>=10){
    yes3();
  }
}


/* Slider Gate */

slider.addEventListener("input",()=>{

  let v = slider.value;

  sliderText.innerText = v+"%";

  if(v>=100){
    unlockGate();
  }
});


function unlockGate(){

  show("s5");

  setTimeout(()=>{
    startPrank();
  },2000);
}


/* Prank */

function startPrank(){

  bgAudio.pause();

  wnVideo.style.display="block";
  wnVideo.play();

  wnVideo.onended = ()=>{

    fadeToBKL();

    wnVideo.style.display="none";

    startEnding();
  }
}


function fadeToBKL(){

  bklAudio.volume=0;
  bklAudio.play();

  let vol=0;

  let fade=setInterval(()=>{

    vol+=0.1;

    if(vol>=0.6){
      vol=0.6;
      clearInterval(fade);
    }

    bklAudio.volume=vol;

  },100);
}


/* Ending */

function startEnding(){

  mkcVideo.style.display="block";
  mkcVideo.play();

  show("s6");

  setTimeout(()=>{
    overlay.style.display="block";
  },10000);
}


/* Replay */

function replay(){

  location.reload();
}
