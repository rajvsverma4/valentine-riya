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
const finalHearts = document.getElementById("finalHearts");
const app = document.getElementById("app");
const heartRain = document.getElementById("heartRain");

let no1Count = 0, no2Count = 0, no3Count = 0;
let audioUnlocked = false, bubbleTimer = null;
let prankStarted = false, ringDone = false;
let wnReady = false, wnStarted = false;

/* ================= INIT ================= */
window.addEventListener("DOMContentLoaded", () => {
    initHeartRain();
    unlockAudio();
    
    if(videoOverlay) videoOverlay.style.display = "none";
    if(videoLoader)  videoLoader.style.display  = "none";

    if(wnVideo){
        wnVideo.addEventListener("canplaythrough", () => {
            wnReady = true;
            if(videoLoader) videoLoader.style.display = "none";
        });
    }
});

/* ================= AUDIO ================= */
function unlockAudio(){
    document.body.addEventListener("click", () => {
        if(!audioUnlocked){
            bgAudio.volume = 0.4;
            bgAudio.play().catch(()=>{});
            audioUnlocked = true;
        }
    }, { once: true });
}

/* ================= HEART RAIN ================= */
function initHeartRain(){
    setInterval(() => {
        const h = document.createElement("div");
        h.className = "heart";
        h.innerHTML = ["💖","💕","❤️","💘"][Math.floor(Math.random()*4)];
        h.style.left = Math.random()*100+"vw";
        h.style.fontSize = 16+Math.random()*18+"px";
        h.style.animationDuration = 6+Math.random()*6+"s";
        heartRain.appendChild(h);
        setTimeout(()=>h.remove(), 12000);
    }, 450);
}

/* ================= TYPEWRITER (FIXED) ================= */
function initTypewriter(container = document) {
    container.querySelectorAll(".typeText").forEach(el => {
        const raw = el.dataset.text || "";
        if (el.typingInterval) clearInterval(el.typingInterval);

        let chars;
        if(window.Intl && Intl.Segmenter){
            const seg = new Intl.Segmenter("en",{granularity:"grapheme"});
            chars = [...seg.segment(raw)].map(s=>s.segment);
        } else {
            chars = Array.from(raw);
        }

        el.textContent = "";
        let i = 0;
        el.typingInterval = setInterval(() => {
            if(i < chars.length){
                el.textContent += chars[i++];
            } else {
                clearInterval(el.typingInterval);
            }
        }, 45);
    });
}

function initFadeText(container = document) {
    container.querySelectorAll(".fadeText").forEach(el => {
        el.style.opacity = 0;
        setTimeout(() => { el.style.opacity = 1; }, 50);
    });
}

/* ================= SCREEN LOGIC ================= */
function show(id){
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const el = document.getElementById(id);
    if(el) {
        el.classList.add("active");
        initFadeText(el);
        initTypewriter(el);
    }
}

/* ================= BUTTON EFFECTS ================= */
function yesEffect(btn){
    btn.classList.add("yesPulse");
    shakeApp();
    setTimeout(() => btn.classList.remove("yesPulse"), 500);
}

function shakeApp(){
    let i=0;
    const t=setInterval(() => {
        app.style.transform = `translate(${Math.random()*6-3}px, ${Math.random()*6-3}px)`;
        if(++i>8){
            clearInterval(t);
            app.style.transform="translate(0,0)";
        }
    }, 35);
}

function showBubble(btn, msg){
    if(bubbleTimer) clearTimeout(bubbleTimer);
    bubble.textContent = msg;
    const r = btn.getBoundingClientRect();
    bubble.style.left = (r.left+r.width/2)+"px";
    bubble.style.top  = (r.bottom+12)+"px";
    bubble.classList.add("show");
    bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 2800);
}

function jumpSafe(btn){
    const appBox = app.getBoundingClientRect();
    const margin = 30;
    let x = appBox.left + margin + Math.random()*(appBox.width-140);
    let y = appBox.top + margin + Math.random()*(appBox.height-140);
    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

/* SCREEN ACTIONS */
function yes1(){ yesEffect(event.target); setTimeout(()=>show("s2"),500); }
function no1(){ 
    no1Count++; jumpSafe(event.target); 
    const msgs=["Don’t lie 😤💖","Try again 😏","Riyaaa please 🥺","Last chance 😤❤️"];
    showBubble(event.target, msgs[no1Count%msgs.length]);
    if(no1Count>=10) yes1();
}

function yes2(){ yesEffect(event.target); setTimeout(()=>show("s3"),500); }
function no2(){
    no2Count++; jumpSafe(event.target);
    showBubble(event.target, "Seriously?? 😭");
    if(no2Count>=5) yes2();
}

function yes3(){ yesEffect(event.target); setTimeout(()=>show("s4"),500); }
function no3(){
    no3Count++; jumpSafe(event.target);
    showBubble(event.target, "Pleaseee 💖");
    if(no3Count>=10) yes3();
}

/* ================= SLIDER & VIDEO ================= */
slider.addEventListener("input", () => {
    const v = Number(slider.value);
    sliderText.textContent = v+"%";
    sliderGlow.style.opacity = v/100;
    if(v>=100 && !ringDone){
        ringDone=true;
        explodeRing();
        show("s5");
        setTimeout(startPrank, 1600);
    }
});

function explodeRing(){
    sliderRing.style.display="block";
    sliderRing.classList.add("ringBoom");
    pageFlash.classList.add("flash");
    setTimeout(() => {
        pageFlash.classList.remove("flash");
        sliderRing.style.display="none";
    }, 900);
}

function startPrank(){
    if(prankStarted) return;
    prankStarted = true;
    bgAudio.pause();
    videoBox.style.display = "block";
    playWN();
}

function playWN(){
    if(wnStarted) return;
    wnStarted = true;
    wnVideo.style.display="block";
    wnVideo.play().catch(()=>{});
    wnVideo.onended = () => {
        wnVideo.style.display="none";
        bklAudio.play();
        startEnding();
    };
}

function startEnding(){
    mkcVideo.style.display="block";
    mkcVideo.play();
    startFinalHearts();
    setTimeout(() => { videoOverlay.style.display="flex"; }, 5000);
}

function startFinalHearts(){
    setInterval(() => {
        const h = document.createElement("div");
        h.className = "heart";
        h.innerHTML = ["💖","😍","🥰"][Math.floor(Math.random()*3)];
        h.style.left = Math.random()*100+"vw";
        finalHearts.appendChild(h);
        setTimeout(()=>h.remove(), 9000);
    }, 350);
}

function replay(){ location.reload(); }
