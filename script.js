/* ================= GLOBAL ================= */

const bgAudio = document.getElementById("bgAudio");
const bklAudio = document.getElementById("bklAudio");

const wnVideo = document.getElementById("wnVideo");
const mkcVideo = document.getElementById("mkcVideo");
const videoBox = document.getElementById("videoBox");

const videoOverlay = document.getElementById("videoOverlay");
const videoLoader = document.getElementById("videoLoader");

const bubble = document.getElementById("bubble");

const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const sliderMsg = document.getElementById("sliderMsg");
const sliderGlow = document.getElementById("sliderGlow");
const sliderRing = document.getElementById("sliderRing");

const pageFlash = document.getElementById("pageFlash");

const app = document.getElementById("app");
const heartRain = document.getElementById("heartRain");


let no1Count = 0;
let no2Count = 0;
let no3Count = 0;

let audioUnlocked = false;
let bubbleTimer = null;

let prankStarted = false;
let ringDone = false;
let wnReady = false;


/* ================= INIT ================= */

window.addEventListener("DOMContentLoaded", () => {

  initHeartRain();
  initFadeText();
  initTypewriter();
  unlockAudio();

  if(videoOverlay) videoOverlay.style.display = "none";
  if(videoLoader)  videoLoader.style.display  = "none";


  // Detect when WN is ready
  if(wnVideo){

    wnVideo.addEventListener("canplaythrough",()=>{
      wnReady = true;

      if(videoLoader){
        videoLoader.style.display = "none";
      }
    });

  }

});


/* ================= AUDIO ================= */

function unlockAudio(){

  document.body.addEventListener("click",()=>{

    if(!audioUnlocked){

      bgAudio.volume = 0.4;
      bgAudio.play().catch(()=>{});

      audioUnlocked = true;
    }

  },{ once:true });

}


/* ================= HEART RAIN ================= */

function initHeartRain(){

  setInterval(()=>{

    const h = document.createElement("div");

    h.className = "heart";
    h.innerHTML = ["💖","💕","❤️","💘"][Math.floor(Math.random()*4)];

    h.style.left = Math.random()*100+"vw";
    h.style.fontSize = 16+Math.random()*18+"px";
    h.style.animationDuration = 6+Math.random()*6+"s";

    heartRain.appendChild(h);

    setTimeout(()=>h.remove(),12000);

  },450);

}


/* ================= TEXT ================= */

function initFadeText(){

  document.querySelectorAll(".fadeText").forEach(el=>{

    el.style.opacity = 0;

    setTimeout(()=>{
      el.style.opacity = 1;
    },200);

  });

}


function initTypewriter(){

  document.querySelectorAll(".typeText").forEach(el=>{

    const raw = el.dataset.text || "";
    const text = Array.from(raw); // Fix emoji bug

    el.textContent = "";

    let i = 0;

    const t = setInterval(()=>{

      if(i < text.length){
        el.textContent += text[i++];
      }else{
        clearInterval(t);
      }

    },45);

  });

}


/* ================= SCREEN ================= */

function show(id){

  document.querySelectorAll(".screen")
    .forEach(s=>s.classList.remove("active"));

  const el = document.getElementById(id);
  if(el) el.classList.add("active");

  initFadeText();
  initTypewriter();

}


/* ================= EFFECT ================= */

function yesEffect(btn){

  btn.classList.add("yesPulse");

  shakeApp();

  setTimeout(()=>{
    btn.classList.remove("yesPulse");
  },500);

}


function shakeApp(){

  let i=0;

  const t=setInterval(()=>{

    app.style.transform =
      `translate(${Math.random()*6-3}px,
                 ${Math.random()*6-3}px)`;

    if(++i>8){
      clearInterval(t);
      app.style.transform="translate(0,0)";
    }

  },35);

}


/* ================= POPUP ================= */

function showBubble(btn,msg){

  if(bubbleTimer) clearTimeout(bubbleTimer);

  bubble.textContent = msg;

  const r = btn.getBoundingClientRect();

  bubble.style.left = (r.left+r.width/2)+"px";
  bubble.style.top  = (r.bottom+12)+"px";

  bubble.classList.add("show");

  bubbleTimer=setTimeout(()=>{
    bubble.classList.remove("show");
  },2800);

}


/* ================= SAFE JUMP ================= */

function jumpSafe(btn){

  const appBox = app.getBoundingClientRect();
  const yesBtn = document.querySelector(".yesBtn");

  let yesBox=null;
  if(yesBtn) yesBox=yesBtn.getBoundingClientRect();

  const margin=30;

  let x,y,tries=0;

  do{

    x = appBox.left+margin+
        Math.random()*(appBox.width-140);

    y = appBox.top+margin+
        Math.random()*(appBox.height-140);

    tries++;

  }while(
    yesBox &&
    overlap(x,y,yesBox) &&
    tries<20
  );

  btn.style.position="fixed";
  btn.style.left=x+"px";
  btn.style.top =y+"px";

}


function overlap(x,y,yes){

  return(
    x>yes.left-80 &&
    x<yes.right+80 &&
    y>yes.top-80 &&
    y<yes.bottom+80
  );

}


/* ================= SCREEN 1 ================= */

function yes1(){

  yesEffect(event.target);

  setTimeout(()=>show("s2"),500);

}


function no1(){

  const btn=event.target;

  no1Count++;

  jumpSafe(btn);

  const msgs=[
    "Don’t lie 😤💖","Try again 😏","Riyaaa please 🥺",
    "You know it 😌","Stop teasing 😂","Just say yes 😭",
    "My heart 💔","Last chance 😤❤️"
  ];

  showBubble(btn,msgs[no1Count%msgs.length]);

  if(no1Count>=10) yes1();

}


/* ================= SCREEN 2 ================= */

function yes2(){

  yesEffect(event.target);

  setTimeout(()=>show("s3"),500);

}


function no2(){

  const btn=event.target;

  no2Count++;

  jumpSafe(btn);

  const msgs=[
    "Excuse me?? 😤😂","You better know 💖",
    "Seriously?? 😭","Press YES 😤","Don’t joke 😏"
  ];

  showBubble(btn,msgs[no2Count%msgs.length]);

  if(no2Count>=5) yes2();

}


/* ================= SCREEN 3 ================= */

function yes3(){

  yesEffect(event.target);

  setTimeout(()=>show("s4"),500);

}


function no3(){

  const btn=event.target;

  no3Count++;

  jumpSafe(btn);

  const msgs=[
    "Just coffee? ☕🥺","One selfie? 📸😅","30 mins? 😭",
    "Pleaseee 💖","My heart 😔","Don’t do this 😂","Say YES 😤❤️"
  ];

  showBubble(btn,msgs[no3Count%msgs.length]);

  if(no3Count>=10) yes3();

}


/* ================= SLIDER ================= */

slider.addEventListener("input",()=>{

  const v=Number(slider.value);

  sliderText.textContent=v+"%";
  sliderGlow.style.opacity=v/100;

  shakeApp();

  if(v>=70&&v<80) sliderMsg.textContent="YES YES 😍💖";
  else if(v>=80&&v<90) sliderMsg.textContent="BINGO 🔥😆";
  else if(v>=90&&v<100) sliderMsg.textContent="CONGOOO 💍💖";
  else{
    const msgs=["Nice 😍","Keep going 😌","Almost 💖","Don’t stop 🥺"];
    sliderMsg.textContent=msgs[Math.floor(v/25)];
  }

  if(v>=100&&!ringDone){

    ringDone=true;

    explodeRing();
    unlockGate();
  }

});


function explodeRing(){

  sliderRing.style.display="block";
  sliderRing.classList.add("ringBoom");

  if(pageFlash){
    pageFlash.classList.add("flash");

    setTimeout(()=>{
      pageFlash.classList.remove("flash");
    },600);
  }

  setTimeout(()=>{

    sliderRing.style.display="none";
    sliderRing.classList.remove("ringBoom");

  },900);

}


/* ================= PRANK ================= */

function unlockGate(){

  show("s5");

  setTimeout(startPrank,1600);

}


function startPrank(){

  if(prankStarted) return;

  prankStarted=true;

  bgAudio.pause();

  videoBox.style.display="block";


  // Show loader until ready
  if(videoLoader && !wnReady){
    videoLoader.style.display="flex";
  }


  const waitForVideo = ()=>{

    if(!wnReady){

      setTimeout(waitForVideo,300);
      return;
    }

    playWN();
  };

  waitForVideo();

}


function playWN(){

  wnVideo.currentTime=0;
  wnVideo.style.display="block";

  wnVideo.play().catch(()=>{});


  // Backup timer
  let forceEnd=setTimeout(()=>{

    if(!wnVideo.ended){

      wnVideo.pause();
      wnVideo.style.display="none";

      crossFade();
      startEnding();
    }

  },(wnVideo.duration||2)*1000+1000);


  wnVideo.onended=()=>{

    clearTimeout(forceEnd);

    crossFade();

    wnVideo.pause();
    wnVideo.style.display="none";

    startEnding();
  };

}


/* ================= AUDIO FADE ================= */

function crossFade(){

  bklAudio.volume=0;
  bklAudio.play();

  let v=0;

  const t=setInterval(()=>{

    v+=0.05;

    if(v>=0.6){
      v=0.6;
      clearInterval(t);
    }

    bklAudio.volume=v;

  },50);

}


/* ================= END ================= */

function startEnding(){

  mkcVideo.style.display="block";
  mkcVideo.play().catch(()=>{});

  setTimeout(()=>{

    if(videoOverlay){
      videoOverlay.style.display="flex";
    }

  },5000);

}


/* ================= REPLAY ================= */

function replay(){
  location.reload();
}
