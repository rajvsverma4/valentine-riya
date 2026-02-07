/* ================= GLOBAL ================= */

const bgAudio = document.getElementById("bgAudio");
const bklAudio = document.getElementById("bklAudio");

const wnVideo = document.getElementById("wnVideo");
const mkcVideo = document.getElementById("mkcVideo");
const videoBox = document.getElementById("videoBox");

const bubble = document.getElementById("bubble");

const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const sliderMsg = document.getElementById("sliderMsg");
const sliderGlow = document.getElementById("sliderGlow");
const sliderRing = document.getElementById("sliderRing");

const app = document.getElementById("app");
const heartRain = document.getElementById("heartRain");


let no1 = 0;
let no2 = 0;
let no3 = 0;

let audioUnlocked = false;
let bubbleTimer = null;

let prankStarted = false;


/* ================= INIT ================= */

window.addEventListener("DOMContentLoaded", () => {

  initHeartRain();
  initFadeText();
  initTypewriter();
  unlockAudio();

});


/* ================= AUDIO ================= */

function unlockAudio() {

  document.body.addEventListener("click", () => {

    if (!audioUnlocked) {

      bgAudio.volume = 0.4;
      bgAudio.play().catch(()=>{});

      audioUnlocked = true;
    }

  }, { once:true });

}


/* ================= HEART RAIN ================= */

function initHeartRain() {

  setInterval(() => {

    const h = document.createElement("div");

    h.className = "heart";
    h.innerHTML = ["💖","💕","❤️","💘"][Math.floor(Math.random()*4)];

    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = 16 + Math.random()*18 + "px";
    h.style.animationDuration = 6 + Math.random()*6 + "s";

    heartRain.appendChild(h);

    setTimeout(()=>h.remove(),12000);

  },450);

}


/* ================= TEXT ANIMATION ================= */

function initFadeText(){

  document.querySelectorAll(".fadeText").forEach(el=>{

    el.style.opacity = 0;

    setTimeout(()=>{
      el.style.opacity = 1;
      el.classList.add("fadeIn");
    },200);

  });

}


function initTypewriter(){

  document.querySelectorAll(".typeText").forEach(el=>{

    const text = el.dataset.text;

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


/* ================= SCREEN CONTROL ================= */

function show(id){

  document.querySelectorAll(".screen")
    .forEach(s=>s.classList.remove("active"));

  document.getElementById(id).classList.add("active");

  initFadeText();
  initTypewriter();

}


/* ================= YES EFFECT ================= */

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


/* ================= BUBBLE ================= */

function showBubble(btn,msg){

  if(bubbleTimer) clearTimeout(bubbleTimer);

  bubble.textContent = msg;

  const r = btn.getBoundingClientRect();

  bubble.style.left = (r.left + r.width/2) + "px";
  bubble.style.top  = (r.bottom + 12) + "px";

  bubble.classList.add("show");

  bubbleTimer = setTimeout(()=>{

    bubble.classList.remove("show");

  },2800);

}


/* ================= SAFE JUMP ================= */

function jumpSafe(btn){

  const appBox = app.getBoundingClientRect();
  const yesBtn = document.querySelector(".yesBtn");

  let yesBox = null;
  if(yesBtn) yesBox = yesBtn.getBoundingClientRect();

  const margin = 30;

  let x,y,tries=0;

  do{

    x = appBox.left + margin +
        Math.random()*(appBox.width-150);

    y = appBox.top + margin +
        Math.random()*(appBox.height-150);

    tries++;

  }while(
    yesBox &&
    overlap(x,y,yesBox) &&
    tries<20
  );

  btn.style.position="fixed";
  btn.style.left = x+"px";
  btn.style.top  = y+"px";

}


function overlap(x,y,yes){

  return (
    x > yes.left-80 &&
    x < yes.right+80 &&
    y > yes.top-80 &&
    y < yes.bottom+80
  );

}


/* ================= SCREEN 1 ================= */

function yes1(){

  yesEffect(event.target);

  setTimeout(()=>{
    show("s2");
  },500);

}


function no1(){

  const btn = event.target;

  no1++;

  jumpSafe(btn);

  const msgs=[
    "Don’t lie 😤💖",
    "Try again 😏",
    "Riyaaa please 🥺",
    "You know it 😌",
    "Stop teasing 😂",
    "Just say yes 😭",
    "My heart 💔",
    "Last chance 😤❤️"
  ];

  showBubble(btn,msgs[no1%msgs.length]);

  if(no1>=10) yes1();

}


/* ================= SCREEN 2 ================= */

function yes2(){

  yesEffect(event.target);

  setTimeout(()=>{
    show("s3");
  },500);

}


function no2(){

  const btn = event.target;

  no2++;

  jumpSafe(btn);

  const msgs=[
    "Excuse me?? 😤😂",
    "You better know 💖",
    "Seriously?? 😭",
    "Press YES 😤",
    "Don’t joke 😏"
  ];

  showBubble(btn,msgs[no2%msgs.length]);

  if(no2>=5) yes2();

}


/* ================= SCREEN 3 ================= */

function yes3(){

  yesEffect(event.target);

  setTimeout(()=>{
    show("s4");
  },500);

}


function no3(){

  const btn = event.target;

  no3++;

  jumpSafe(btn);

  const msgs=[
    "Just coffee? ☕🥺",
    "One selfie? 📸😅",
    "30 mins? 😭",
    "Pleaseee 💖",
    "My heart 😔",
    "Don’t do this 😂",
    "Say YES 😤❤️"
  ];

  showBubble(btn,msgs[no3%msgs.length]);

  if(no3>=10) yes3();

}


/* ================= SLIDER ================= */

let ringDone = false;

slider.addEventListener("input",()=>{

  const v = +slider.value;

  sliderText.textContent = v+"%";
  sliderGlow.style.opacity = v/100;

  shakeApp();

  /* 70%+ Reactions */

  if(v>=70 && v<80){
    sliderMsg.textContent="YES YES 😍💖";
  }
  else if(v>=80 && v<90){
    sliderMsg.textContent="BINGO 🔥😆";
  }
  else if(v>=90 && v<100){
    sliderMsg.textContent="CONGOOO 💍💖";
  }
  else{
    const msgs=[
      "Nice 😍",
      "Keep going 😌",
      "Almost 💖",
      "Don’t stop 🥺"
    ];
    sliderMsg.textContent=msgs[Math.floor(v/25)];
  }


  /* Explosion at 100 */

  if(v>=100 && !ringDone){

    ringDone = true;

    explodeRing();

    unlockGate();
  }

});


function explodeRing(){

  sliderRing.style.display="block";
  sliderRing.classList.add("ringBoom");

  setTimeout(()=>{

    sliderRing.style.display="none";
    sliderRing.classList.remove("ringBoom");

  },900);

}


/* ================= PRANK ================= */

function unlockGate(){

  show("s5");

  setTimeout(()=>{
    startPrank();
  },1700);

}


function startPrank(){

  if(prankStarted) return;

  prankStarted = true;

  bgAudio.pause();

  videoBox.style.display="block";

  wnVideo.currentTime = 0;
  wnVideo.style.display="block";
  wnVideo.play();


  wnVideo.onended = ()=>{

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
  mkcVideo.play();

  show("s6");

  setTimeout(()=>{

    document.getElementById("finalOverlay").style.display="block";

  },10000);

}


/* ================= REPLAY ================= */

function replay(){
  location.reload();
}
