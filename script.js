let firstYesDone = false;
let maxTriggered = false;


// ================= INIT =================

window.addEventListener("DOMContentLoaded", () => {

    document.title = "Raj ❤️ Supriya";

    document.getElementById("valentineTitle").textContent =
        "Supriya, my love 💖";

    document.getElementById("question1Text").textContent =
        "Hey Supriya 💖, This is Raj... Will you be my Valentine? 😘";

    document.getElementById("question2Text").textContent =
        "How much do you love me? 😘";

    document.getElementById("question3Text").textContent =
        "So… Will you be mine forever? ❤️";


    createFloatingElements();
    setupMusicPlayer();
    initLoveMeter();
    startCountdown();

    showNextQuestion(1);
});


// ================= COUNTDOWN =================

function startCountdown(){

    const target = new Date("Feb 14, 2026 00:00:00").getTime();

    const el = document.createElement("p");
    el.id = "countdown";
    el.style.color = "#ff1744";
    el.style.fontWeight = "bold";
    el.style.marginBottom = "10px";

    document.querySelector(".container").prepend(el);


    setInterval(()=>{

        const now = new Date().getTime();
        const diff = target - now;

        if(diff < 0){
            el.textContent = "💖 Happy Valentine’s Day 2026 💖";
            return;
        }

        const d = Math.floor(diff/(1000*60*60*24));
        const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        const m = Math.floor((diff%(1000*60*60))/(1000*60));
        const s = Math.floor((diff%(1000*60))/1000);

        el.textContent =
          `⏳ Valentine 2026 in: ${d}d ${h}h ${m}m ${s}s`;

    },1000);
}


// ================= MUSIC =================

function setupMusicPlayer(){

    const btn = document.getElementById("musicToggle");
    const music = document.getElementById("bgMusic");

    if(!music) return;

    music.load();

    btn.addEventListener("click",()=>{

        if(music.paused){

            music.play();
            btn.textContent = "⏸️ Pause Music";

        }else{

            music.pause();
            btn.textContent = "🎵 Play Music";
        }
    });
}


// ================= FLOATING =================

function createFloatingElements(){

    const container = document.querySelector(".floating-elements");
    if(!container) return;

    ["❤️","💖","💕","💘"].forEach(h=>{

        const div = document.createElement("div");
        div.className = "heart";
        div.innerHTML = h;

        setRandomPosition(div);
        container.appendChild(div);
    });
}


function setRandomPosition(el){

    el.style.left = Math.random()*100+"vw";
    el.style.animationDelay = Math.random()*3+"s";
    el.style.animationDuration =
        10+Math.random()*15+"s";
}


// ================= NAVIGATION =================

function showNextQuestion(num){

    document.querySelectorAll(".question-section")
      .forEach(q=>q.classList.add("hidden"));

    document.getElementById(`question${num}`)
      .classList.remove("hidden");
}


function goToFinal(){
    showNextQuestion(3);
}


function finalYes(){
    celebrate();
}


// ================= YES =================

function handleYesClick(){

    if(!firstYesDone){

        firstYesDone=true;
        particleStorm();
        shakeScreen(1);
    }

    showNextQuestion(2);
}


// ================= LOVE METER =================

let loveMeter,loveValue,extraLove;

function initLoveMeter(){

    loveMeter=document.getElementById("loveMeter");
    loveValue=document.getElementById("loveValue");
    extraLove=document.getElementById("extraLove");

    if(!loveMeter)return;


    loveMeter.value=100;
    loveValue.textContent=100;


    loveMeter.addEventListener("input",()=>{

        const v=+loveMeter.value;

        loveValue.textContent=v;


        const p=v/10000;


        loveMeter.style.boxShadow=
          `0 0 ${15+p*50}px rgba(255,23,68,1),
           0 0 ${25+p*70}px rgba(255,128,171,1)`;


        shakeScreen(p);


        // Power glow
        document
          .querySelector(".love-meter")
          .classList.add("power");

        setTimeout(()=>{
          document
            .querySelector(".love-meter")
            .classList.remove("power");
        },300);


        if(v>100){

            extraLove.classList.remove("hidden");

            if(v>9000){
                extraLove.textContent="MAX LOVE 💍🔥";
                extraLove.classList.add("super-love");
            }
            else if(v>5000){
                extraLove.textContent="Too Much Love 😍";
            }
            else{
                extraLove.textContent="More Than 100% 😘";
            }

        }else{
            extraLove.classList.add("hidden");
        }


        // Mini blasts
        if(v>8000 && Math.random()>0.7){
            shockwave();
            particleStorm();
        }


        if(v>=10000 && !maxTriggered){

            maxTriggered=true;
            startFinalExplosion();
        }

        if(v<9800)maxTriggered=false;
    });
}


// ================= EFFECTS =================

function startFinalExplosion(){

    shockwave();
    particleStorm();
    heartRain();
    fireworks();
}


// Shockwave
function shockwave(){

    const wave=document.createElement("div");

    wave.style.position="fixed";
    wave.style.left="50%";
    wave.style.top="50%";
    wave.style.width="20px";
    wave.style.height="20px";
    wave.style.border="3px solid rgba(255,60,120,0.9)";
    wave.style.borderRadius="50%";
    wave.style.transform="translate(-50%,-50%)";
    wave.style.zIndex=99999;

    document.body.appendChild(wave);


    wave.animate([
        {transform:"translate(-50%,-50%) scale(1)",opacity:1},
        {transform:"translate(-50%,-50%) scale(40)",opacity:0}
    ],{
        duration:900,
        easing:"ease-out"
    });

    setTimeout(()=>wave.remove(),900);
}


// Particles
function particleStorm(){

    for(let i=0;i<120;i++){

        const p=document.createElement("div");

        p.innerHTML=Math.random()>0.5?"💖":"✨";

        p.style.position="fixed";
        p.style.left="50%";
        p.style.top="50%";
        p.style.zIndex=9999;

        document.body.appendChild(p);


        const x=(Math.random()-0.5)*800;
        const y=(Math.random()-0.5)*600;

        p.animate([
            {transform:"scale(1)",opacity:1},
            {transform:`translate(${x}px,${y}px) scale(0)`,opacity:0}
        ],{
            duration:1000
        });

        setTimeout(()=>p.remove(),1000);
    }
}


// Heart Rain
function heartRain(){

    const interval=setInterval(()=>{

        const h=document.createElement("div");

        h.innerHTML="❤️";
        h.style.position="fixed";
        h.style.left=Math.random()*100+"vw";
        h.style.top="-20px";
        h.style.fontSize="24px";
        h.style.zIndex=9999;

        document.body.appendChild(h);

        h.animate([
            {transform:"translateY(0)"},
            {transform:"translateY(110vh)"}
        ],{
            duration:4000
        });

        setTimeout(()=>h.remove(),4000);

    },200);


    setTimeout(()=>clearInterval(interval),10000);
}


// Fireworks
function fireworks(){

    for(let i=0;i<6;i++){
        setTimeout(particleStorm,i*250);
    }
}


// Screen Shake
function shakeScreen(p=0.3){

    const c=document.querySelector(".container");
    if(!c)return;

    const i=2+p*7;

    c.style.transform=
      `translate(${Math.random()*i-i/2}px,
                 ${Math.random()*i-i/2}px)`;


    setTimeout(()=>{
        c.style.transform="translate(0,0)";
    },40);
}


// ================= TYPEWRITER =================

function typeWriter(el,text,speed=60){

    let i=0;
    el.textContent="";

    const timer=setInterval(()=>{

        if(i<text.length){
            el.textContent+=text[i++];
        }else{
            clearInterval(timer);
        }

    },speed);
}


// ================= CELEBRATION =================

function celebrate(){

    document
      .querySelectorAll(".question-section")
      .forEach(q=>q.classList.add("hidden"));


    document.getElementById("celebration")
      .classList.remove("hidden");


    const title=document.getElementById("celebrationTitle");
    const msg=document.getElementById("celebrationMessage");


    typeWriter(title,"I Love You Supriya ❤️",70);


    setTimeout(()=>{

        typeWriter(
          msg,
          "You are my world… my happiness… my forever 💖 Raj",
          50
        );

    },1500);


    document.getElementById("celebrationEmojis").textContent =
        "💍💘🥰💕✨";


    startFinalExplosion();
}


// ================= NO BUTTON =================

// Teasing Messages
const noMessages=[
 "First No? 😏 Really?",
 "Try again babe 💕",
 "Not allowed ❌😂",
 "My heart is breaking 💔",
 "Last chance 😤❤️",
 "I know you love me 😘",
 "Stop teasing 😭💖",
 "Okay click Yes now 😍"
];

let noIndex=0,noTry=0;


// Bubble Helpers
function showBubble(bubble,msg){

    bubble.textContent=msg;

    bubble.classList.remove("hidden");
    bubble.classList.add("show");

    clearTimeout(window.noTimer);

    window.noTimer=setTimeout(()=>{

        bubble.classList.remove("show");
        bubble.classList.add("hidden");

    },1800);
}


function positionBubble(btn,bubble){

    const r=btn.getBoundingClientRect();

    bubble.style.left =
      r.left+r.width/2+"px";

    bubble.style.top =
      r.bottom+10+"px";
}


// Main No Handler
function handleNoClick(e){

    const btn=e.target;
    const bubble=document.getElementById("noMessageBubble");

    noTry++;


    if(noTry>=6){

        btn.textContent="Okay Yes ❤️";
        btn.onclick=handleYesClick;

        showBubble(bubble,"I knew it 😜❤️");
        return;
    }


    moveButton(btn);


    setTimeout(()=>{
        positionBubble(btn,bubble);
    },50);


    const msg=noMessages[noIndex++%noMessages.length];

    showBubble(bubble,msg);
}


// Smart Move
function moveButton(btn){

    let speed=
      noTry<3?250:
      noTry<5?120:
      40;


    btn.style.transition=`all ${speed}ms ease-out`;


    const x=Math.random()*(window.innerWidth-120);
    const y=Math.random()*(window.innerHeight-120);

    btn.style.position="fixed";
    btn.style.left=x+"px";
    btn.style.top=y+"px";
}
