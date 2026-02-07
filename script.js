/* ================= GLOBAL ================= */

const bgAudio = document.getElementById("bgAudio");
const bklAudio = document.getElementById("bklAudio");

const wnVideo = document.getElementById("wnVideo");
const mkcVideo = document.getElementById("mkcVideo");

const bubble = document.getElementById("bubble");

const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const sliderMsg = document.getElementById("sliderMsg");
const sliderGlow = document.getElementById("sliderGlow");

const heartRain = document.getElementById("heartRain");


let no1Count = 0;
let no2Count = 0;
let no3Count = 0;

let audioUnlocked = false;


/* ================= INIT ================= */

window.addEventListener("DOMContentLoaded", ()=>{

  initHeartRain();
  initFadeText();
  initTypewriter();

  unlockAudio();

});


/* ================= AUDIO ================= */

function unlockAudio(){

  document.body.addEventListener("click", ()=>{

    if(!audioUnlocked){

      bgAudio.volume = 0.4;
      bgAudio.play().catch(()=>{});

      audioUnlocked = true;
    }

  }, { once:true });
}


/* ================= HEART RAIN ================= */

function initHeartRain(){

  setInterval(()=>{

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = ["💖","💕","💘","❤️"][Math.floor(Math.random()*4)];

    heart.style.left = Math.random()*100+"vw";
    heart.style.fontSize = 18+Math.random()*18+"px";
    heart.style.animationDuration = 6+Math.random()*6+"s";

    heartRain.appendChild(heart);

    setTimeout(()=>heart.remove(),12000);

  },400);
}


/* ================= TEXT ANIM ================= */

function initFadeText(){

  document.querySelectorAll(".fadeText").forEach(el=>{

    el.style.opacity = 0;

    setTimeout(()=>{
      el.style.opacity = 1;
      el.classList.add("fadeIn");
    },300);
  });
}


function initTypewriter(){

  document.querySelectorAll(".typeText").forEach(el=>{

    const txt = el.dataset.text;

    el.textContent = "";

    let i = 0;

    const timer = setInterval(()=>{

      if(i < txt.length){

        el.textContent += txt[i++];

      }else{
        clearInterval(timer);
      }

    },50);

  });
}


/* ================= SCREEN CONTROL ================= */

function show(id){

  document.querySelectorAll(".screen")
  .forEach(s=>s.classList.remove("active"));

  const screen = document.getElementById(id);

  screen.classList.add("active");

  // Re-trigger animations
  initFadeText();
  initTypewriter();
}


/* ================= EFFECTS ================= */

function yesEffect(btn){

  btn.classList.add("yesPulse");

  burstHearts(btn);

  shakeApp();

  setTimeout(()=>{
    btn.classList.remove("yesPulse");
  },600);
}


function burstHearts(el){

  const r = el.getBoundingClientRect();

  for(let i=0;i<15;i++){

    const h = document.createElement("div");

    h.innerHTML="💖";
    h.className="burst";

    h.style.left = r.left+r.width/2+"px";
    h.style.top = r.top+r.height/2+"px";

    document.body.appendChild(h);

    const x=(Math.random()-0.5)*200;
    const y=(Math.random()-0.5)*200;

    h.animate([
      {transform:"scale(1)",opacity:1},
      {transform:`translate(${x}px,${y}px) scale(0)`,opacity:0}
    ],{duration:800});

    setTimeout(()=>h.remove(),800);
  }
}


function shakeApp(){

  const app = document.getElementById("app");

  let i=0;

  const t = setInterval(()=>{

    app.style.transform =
      `translate(${Math.random()*6-3}px,
                 ${Math.random()*6-3}px)`;

    if(++i>8){
      clearInterval(t);
      app.style.transform="translate(0,0)";
    }

  },40);
}


/* ================= BUBBLE ================= */

function showBubble(btn,msg){

  bubble.textContent = msg;

  const r = btn.getBoundingClientRect();

  bubble.style.left = r.left+r.width/2+"px";
  bubble.style.top = r.top-40+"px";

  bubble.classList.remove("hidden");
  bubble.classList.add("show");

  setTimeout(()=>{
    bubble.classList.remove("show");
    bubble.classList.add("hidden");
  },1500);
}


/* ================= JUMP ================= */

function jump(btn){

  btn.style.position="fixed";

  const x=Math.random()*(window.innerWidth-120);
  const y=Math.random()*(window.innerHeight-120);

  btn.style.left=x+"px";
  btn.style.top=y+"px";
}


/* ================= SCREEN 1 ================= */

function yes1(){

  yesEffect(event.target);

  setTimeout(()=>{
    show("s2");
  },600);
}


function no1(){

  const btn = event.target;

  no1Count++;

  jump(btn);

  const msgs=[
    "Don’t lie 😤💖",
    "Try again 😏",
    "Riyaaa please 🥺",
    "You know it 😌",
    "Stop teasing 😂",
    "Just say yes 😭",
    "My heart 💔",
    "Okay last chance 😤❤️"
  ];

  showBubble(btn,msgs[no1Count%msgs.length]);

  if(no1Count>=10){
    yes1();
  }
}


/* ================= SCREEN 2 ================= */

function yes2(){

  yesEffect(event.target);

  setTimeout(()=>{
    show("s3");
  },600);
}


function no2(){

  const btn = event.target;

  no2Count++;

  jump(btn);

  const msgs=[
    "Excuse me?? 😤😂",
    "Don’t joke 😏",
    "You better know 💖",
    "Seriously?? 😭",
    "Press YES 😤",
  ];

  showBubble(btn,msgs[no2Count%msgs.length]);

  if(no2Count>=5){
    yes2();
  }
}


/* ================= SCREEN 3 ================= */

function yes3(){

  yesEffect(event.target);

  setTimeout(()=>{
    show("s4");
  },600);
}


function no3(){

  const btn = event.target;

  no3Count++;

  jump(btn);

  const msgs=[
    "Just coffee? ☕🥺",
    "One selfie? 📸😅",
    "30 mins? 😭",
    "Pleaseee 💖",
    "My heart 😔",
    "Don’t do this 😂",
    "Say YES 😤❤️"
  ];

  showBubble(btn,msgs[no3Count%msgs.length]);

  if(no3Count>=10){
    yes3();
  }
}


/* ================= SLIDER ================= */

slider.addEventListener("input",()=>{

  const v = +slider.value;

  sliderText.textContent = v+"%";

  sliderGlow.style.opacity = v/100;

  shakeApp();

  const msgs=[
    "Nice 😍",
    "Keep going 😌",
    "Almost 💖",
    "Don’t stop 🥺",
    "So close 🔥",
    "YESSS 😍"
  ];

  sliderMsg.textContent = msgs[Math.floor(v/20)];

  if(v>=100){
    unlockGate();
  }
});


function unlockGate(){

  show("s5");

  explosion();

  setTimeout(()=>{
    startPrank();
  },2000);
}


/* ================= EXPLOSION ================= */

function explosion(){

  for(let i=0;i<60;i++){

    const p=document.createElement("div");

    p.innerHTML=Math.random()>0.5?"💖":"✨";
    p.className="particle";

    p.style.left="50%";
    p.style.top="50%";

    document.body.appendChild(p);

    const x=(Math.random()-0.5)*600;
    const y=(Math.random()-0.5)*600;

    p.animate([
      {transform:"scale(1)",opacity:1},
      {transform:`translate(${x}px,${y}px) scale(0)`,opacity:0}
    ],{duration:1000});

    setTimeout(()=>p.remove(),1000);
  }
}


/* ================= PRANK ================= */

function startPrank(){

  bgAudio.pause();

  wnVideo.style.display="block";
  wnVideo.play();

  wnVideo.onended = ()=>{

    crossFade();

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


/* ================= ENDING ================= */

function startEnding(){

  mkcVideo.style.display="block";
  mkcVideo.play();

  show("s6");

  setTimeout(()=>{
    overlay.style.display="block";
  },10000);
}


/* ================= REPLAY ================= */

function replay(){
  location.reload();
}
