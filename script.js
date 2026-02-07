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
    initTypewriter(document);
    initFadeText(document);

    if(wnVideo){
        wnVideo.addEventListener("canplaythrough", () => {
            wnReady = true;
            if(videoLoader) videoLoader.style.display = "none";
        });
        wnVideo.addEventListener("loadedmetadata", () => { wnReady = true; });
    }
});

function unlockAudio(){
    document.body.addEventListener("click", () => {
        if(!audioUnlocked){
            bgAudio.volume = 0.4;
            bgAudio.play().catch(()=>{});
            wnVideo.load();
            mkcVideo.load();
            bklAudio.load();
            wnVideo.play().then(() => wnVideo.pause()).catch(()=>{});
            mkcVideo.play().then(() => mkcVideo.pause()).catch(()=>{});
            bklAudio.play().then(() => bklAudio.pause()).catch(()=>{});
            audioUnlocked = true;
        }
    }, { once: true });
}

/* ================= ANIMATIONS ================= */
function initHeartRain(){
    setInterval(() => {
        const h = document.createElement("div");
        h.className = "heart";
        h.innerHTML = ["💖","💕","❤️","💘"][Math.floor(Math.random()*4)];
        h.style.left = Math.random()*100+"vw";
        h.style.animationDuration = "6s";
        heartRain.appendChild(h);
        setTimeout(()=>h.remove(), 12000);
    }, 450);
}

function initTypewriter(container) {
    container.querySelectorAll(".typeText").forEach(el => {
        const raw = el.dataset.text || "";
        if (el.typingInterval) clearInterval(el.typingInterval);
        let chars = Array.from(raw);
        el.textContent = "";
        let i = 0;
        el.typingInterval = setInterval(() => {
            if(i < chars.length){ el.textContent += chars[i++]; }
            else { clearInterval(el.typingInterval); }
        }, 45);
    });
}

function initFadeText(container) {
    container.querySelectorAll(".fadeText").forEach(el => {
        el.style.opacity = 0;
        setTimeout(() => { el.style.opacity = 1; }, 50);
    });
}

function yesEffect(btn){
    if(!btn) return;
    btn.classList.add("yesPulse");
    shakeApp();
    setTimeout(() => btn.classList.remove("yesPulse"), 500);
}

function shakeApp(){
    let i=0;
    const t=setInterval(() => {
        app.style.transform = `translate(${Math.random()*6-3}px, ${Math.random()*6-3}px)`;
        if(++i>8){ clearInterval(t); app.style.transform="translate(0,0)"; }
    }, 35);
}

function show(id){
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const el = document.getElementById(id);
    if(el) {
        el.classList.add("active");
        initFadeText(el);
        initTypewriter(el);
    }
}

function jumpSafe(btn) {
    const appBox = app.getBoundingClientRect();
    const yesBtn = document.querySelector(".screen.active .yesBtn");
    let yesBox = yesBtn ? yesBtn.getBoundingClientRect() : null;
    const margin = 30;
    let x, y, tries = 0;
    do {
        x = appBox.left + margin + Math.random() * (appBox.width - 140);
        y = appBox.top + margin + Math.random() * (appBox.height - 140);
        tries++;
    } while (yesBox && overlap(x, y, yesBox) && tries < 25);
    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

function overlap(x, y, yes) {
    return (x > yes.left - 80 && x < yes.right + 80 && y > yes.top - 80 && y < yes.bottom + 80);
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

/* ================= ACTIONS ================= */
function yes1(){ yesEffect(event.target); setTimeout(()=>show("s2"),500); }
function no1(){
    no1Count++; jumpSafe(event.target);
    const msgs=["Don’t lie 😤💖","Try again 😏","Riyaaa please 🥺","Last chance 😤❤️"];
    showBubble(event.target, msgs[no1Count % msgs.length]);
    if(no1Count>=10) yes1();
}

function yes2(){ yesEffect(event.target); setTimeout(()=>show("s3"),500); }
function no2(){
    no2Count++; jumpSafe(event.target);
    // RESTORED No2 layers
    const msgs=["Excuse me?? 😤😂","You better know 💖","Seriously?? 😭","Don’t joke 😏"];
    showBubble(event.target, msgs[no2Count % msgs.length]);
    if(no2Count>=5) yes2();
}

function yes3(){ yesEffect(event.target); setTimeout(()=>show("s4"),500); }
function no3(){
    no3Count++; jumpSafe(event.target);
    const msgs=["Just coffee? ☕🥺","Just 30 min? ⏳", "Just 15 min? 🥺", "Please princess 👑💖", "Say YES 😤❤️"];
    showBubble(event.target, msgs[no3Count % msgs.length]);
    if(no3Count>=12) yes3();
}

/* ================= SLIDER ================= */
slider.addEventListener("input", () => {
    const v = Number(slider.value);
    sliderText.textContent = v+"%";
    sliderGlow.style.opacity = v/100;
    shakeApp();
    if(v>=70 && v<80) sliderMsg.textContent="YES YES 😍💖";
    else if(v>=90) sliderMsg.textContent="CONGOOO 💍💖";
    else sliderMsg.textContent = ["Nice 😍","Keep going 😌","Almost 💖"][Math.floor(v/34)];

    if(v>=100 && !ringDone){
        ringDone=true;
        explodeRing();
        setTimeout(() => show("s5"), 500);
        setTimeout(startPrank, 2500);
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

/* ================= VIDEO & RECOVERY ================= */
function startPrank(){
    if(prankStarted) return;
    prankStarted = true;
    bgAudio.pause();
    videoBox.style.display = "block";
    if(videoLoader && !wnReady) videoLoader.style.display = "flex";
    waitForWN();
}

function waitForWN() {
    if (wnReady) { playWN(); } 
    else { setTimeout(waitForWN, 300); }
}

function playWN(){
    if(wnStarted) return;
    wnStarted = true;
    if(videoLoader) videoLoader.style.display = "none";
    wnVideo.style.display="block";
    wnVideo.muted = false;
    wnVideo.volume = 1.0;
    let p = wnVideo.play();
    if (p !== undefined) {
        p.catch(() => { 
            wnVideo.muted = true; 
            wnVideo.play(); 
            setTimeout(() => { wnVideo.muted = false; }, 1000);
        });
    }
    wnVideo.onended = () => {
        wnVideo.style.display="none";
        bklAudio.muted = false;
        bklAudio.volume = 0;
        bklAudio.play().catch(()=>{});
        crossFadeAudio();
        startEnding();
    };
}

function crossFadeAudio(){
    let v = 0;
    const t = setInterval(() => {
        v += 0.05;
        if(v >= 0.6) { v = 0.6; clearInterval(t); }
        bklAudio.volume = v;
    }, 50);
}

function startEnding(){
    mkcVideo.style.display="block";
    mkcVideo.muted = true; 
    mkcVideo.play().catch(() => {});
    
    if(!window.finalHeartTimer) {
        window.finalHeartTimer = setInterval(() => {
            const h = document.createElement("div");
            h.className = "heart";
            h.innerHTML = ["💖","💕","❤️","💘","😍","🥰"][Math.floor(Math.random()*6)];
            h.style.left = Math.random()*100+"vw";
            finalHearts.appendChild(h);
            setTimeout(()=>h.remove(), 9000);
        }, 350);
    }

    setTimeout(() => {
        videoOverlay.style.display="flex";
    }, 4000);
}

function replay(){ location.reload(); }
