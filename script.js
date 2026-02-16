const blacklist = ["hitler", "motoriste", "zide", "zid", "nsdap", "pirati", "ano", "komuniste", "stacilo", "spd", "okamura", "fasismus", "nacismus"];
let isDead = false;
let videoPlayed = false;

// POJISTKA: Schování prvků hned po načtení
window.onload = function() {
    document.getElementById('radek-ears-container').style.display = 'none';
    document.getElementById('bitcoin-container').style.display = 'none';
    document.getElementById('macinka-img').style.display = 'none';
    document.getElementById('turek-img').style.display = 'none';
};

const specialCombos = [
    { words: ["radek", "uši"], result: "JASNÝ ANO" },
    { words: ["koci", "idiot"], result: "URČITĚ ANO" },
    { words: ["kocourek", "idiot"], result: "URČITĚ ANO" },
    { words: ["matrix", "oracle"], result: "VŽDY" }
];

const answersPositive = ["ANO", "URČITĚ", "JASNÁ VĚC", "ROZHODNĚ", "BEZPOCHYBY"];
const answersNegative = ["NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "BOHUŽEL NE", "VYLOUČENO"];

function monitorInput(val) {
    if(isDead) return;
    const raw = val.toLowerCase();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if(raw.includes("lgbt")) document.getElementById('terminal-ui').classList.add('rainbow-mode');
    
    if(raw.includes("radek")) {
        const ears = document.getElementById('radek-ears-container');
        ears.style.setProperty('display', 'block', 'important');
        setTimeout(() => { ears.style.setProperty('display', 'none', 'important'); }, 120000); 
    }

    if (clean.includes("furry") || clean.includes("coufal")) {
        const furry = document.getElementById('furry-label');
        furry.style.setProperty('display', 'block', 'important');
    }

    if (clean.includes("lubosek") && clean.includes("hunter") && !videoPlayed) {
        playVideo("https://www.youtube.com/embed/l2pw-TiT4Tk?autoplay=1", 59000);
    }

    if(raw.includes("macinka")) { 
        const img = document.getElementById('macinka-img');
        img.style.setProperty('display', 'block', 'important');
        setTimeout(() => triggerShutdown(), 2500); 
    }
    if(raw.includes("turek")) { 
        const img = document.getElementById('turek-img');
        img.style.setProperty('display', 'block', 'important');
        setTimeout(() => triggerShutdown(), 2500); 
    }

    if(clean.includes("med") || clean.includes("zelezo")) {
        const btc = document.getElementById('bitcoin-container');
        btc.style.setProperty('display', 'block', 'important');
        setTimeout(() => { btc.style.setProperty('display', 'none', 'important'); }, 60000);
    }

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
    }, 800);
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
