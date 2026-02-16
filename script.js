const blacklist = ["hitler", "motoriste", "zide", "zid", "nsdap", "pirati", "ano", "komuniste", "stacilo", "spd", "okamura", "fasismus", "nacismus"];
let isDead = false;
let videoPlayed = false;

// TABULKA PEVNÝCH ROZHODNUTÍ
const specialCombos = [
    { words: ["radek", "uši"], result: "URČITĚ ANO" },
    { words: ["matrix", "oracle"], result: "VŽDY A VŠUDE" },
    { words: ["pivo", "zdarma"], result: "TOTÁLNÍ NE" },
    { words: ["koci", "idiot"], result: "JASNÝ ANO" },
    { words: ["kocourek", "idiot"], result: "JASNÝ ANO" }
];

const answersPositive = ["ANO", "URČITĚ", "JASNÁ VĚC", "ROZHODNĚ", "BEZPOCHYBY", "STOPROCENTNĚ"];
const answersNegative = ["NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "BOHUŽEL NE", "VYLOUČENO", "URČITĚ NE"];

function monitorInput(val) {
    if(isDead) return;
    const inputField = document.getElementById('user-input');
    const raw = val.toLowerCase();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if(raw.includes("lgbt")) document.getElementById('terminal-ui').classList.add('rainbow-mode');
    
    if(raw.includes("radek")) {
        document.getElementById('radek-ears-container').style.display = "block";
        setTimeout(() => { document.getElementById('radek-ears-container').style.display = "none"; }, 120000); 
    }

    // FURRY / COUFAL LABEL - Zůstane napořád
    if (raw.includes("furry") || raw.includes("coufal")) {
        document.getElementById('furry-label').style.display = "block";
    }

    // BLOKACE FURRY/COUFAL + HONZA/JAN
    if ((raw.includes("furry") || raw.includes("coufal")) && (raw.includes("honza") || raw.includes("jan"))) {
        inputField.value = ""; 
        document.getElementById('status-bar').innerText = "ZAKÁZANÁ KOMBINACE!";
        return; 
    }

    // EASTER EGGS: VIDEA (Lubošek + Hunter loví jeleny)
    if (raw.includes("lubosek") && raw.includes("hunter") && !videoPlayed) {
        playVideo("https://www.youtube.com/embed/l2pw-TiT4Tk?autoplay=1", 59000);
    }
    if(raw.includes("sssr") && raw.includes("hanz") && !videoPlayed) {
        playVideo("https://www.youtube.com/embed/UKrA8hv8dvE?autoplay=1", 52000);
    }

    if(raw.includes("macinka")) { showTopImg('macinka-img'); setTimeout(() => triggerShutdown(), 2500); }
    if(raw.includes("turek")) { showTopImg('turek-img'); setTimeout(() => triggerShutdown(), 2500); }

    blacklist.forEach(word => {
        if(clean.includes(word) && !raw.includes("turek") && !raw.includes("macinka")) triggerShutdown();
    });
}

function playVideo(url, duration) {
    videoPlayed = true;
    const overlay = document.getElementById('video-overlay');
    const iframe = document.getElementById('secret-video');
    iframe.src = url; overlay.style.display = "flex";
    setTimeout(() => { overlay.style.display = "none"; iframe.src = ""; videoPlayed = false; }, duration);
}

function showTopImg(id) {
    const img = document.getElementById(id); img.style.display = "block";
    setTimeout(() => { if(!isDead) img.style.display = "none"; }, 4000);
}

function triggerShutdown() { isDead = true; document.getElementById('idiot-overlay').style.display = "flex"; }

function startProcess() {
    if(isDead) return;
    const input = document.getElementById('user-input').value.trim();
    const status = document.getElementById('status-bar');

    if (!input.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        return;
    }

    document.getElementById('final-result').innerText = "";
    status.style.color = "#00ff41";
    
    const steps = ["DEŠIFRUJI...", "SKENUJI DATABÁZI...", "VÝSLEDEK NALEZEN!"];
    let i = 0;
    const loader = setInterval(() => {
        status.innerText = steps[i++];
        if(i >= steps.length) { clearInterval(loader); finishProcess(input); }
    }, 700);
}

function finishProcess(input) {
    const res = document.getElementById('final-result');
    const raw = input.toLowerCase();
    let ans = Math.random() > 0.5 
        ? answersPositive[Math.floor(Math.random() * answersPositive.length)] 
        : answersNegative[Math.floor(Math.random() * answersNegative.length)];

    specialCombos.forEach(combo => {
        if (combo.words.every(word => raw.includes(word))) ans = combo.result;
    });
    res.innerText = ans;
}
