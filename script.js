const blacklist = ["hitler", "motoriste", "zide", "pirati", "ano", "komuniste", "stacilo", "turek", "macinka", "spd", "okamura", "fasismus", "nacismus"];
let isDead = false;
let videoPlayed = false;

function monitorInput(val) {
    if(isDead) return;
    const raw = val.toLowerCase();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // RADEK TRIGGER
    if(raw.includes("radek")) {
        document.getElementById('radek-ears-container').style.display = "block";
        setTimeout(() => {
            document.getElementById('radek-ears-container').style.display = "none";
        }, 15000);
    }

    // MACINKA & TUREK
    if(raw.includes("macinka")) { showTopImg('macinka-img'); }
    if(raw.includes("turek")) { showTopImg('turek-img'); }

    // BITCOIN (Měď, Železo, Kabel)
    if(clean.includes("med") || clean.includes("zelezo") || clean.includes("kabel")) {
        document.getElementById('bitcoin-container').style.display = "block";
        setTimeout(() => {
            document.getElementById('bitcoin-container').style.display = "none";
        }, 60000);
    }

    // SSSR + HANZ VIDEO
    if(raw.includes("sssr") && raw.includes("hanz") && !videoPlayed) {
        videoPlayed = true;
        const overlay = document.getElementById('video-overlay');
        const iframe = document.getElementById('soviet-video');
        iframe.src = "https://www.youtube.com/embed/UKrA8hv8dvE?autoplay=1";
        overlay.style.display = "flex";
        setTimeout(() => {
            overlay.style.display = "none";
            iframe.src = "";
            videoPlayed = false;
        }, 52000);
    }

    // LGBT MÓD
    if(raw.includes("lgbt")) {
        document.getElementById('terminal-ui').classList.add('rainbow-mode');
    } else {
        document.getElementById('terminal-ui').classList.remove('rainbow-mode');
    }

    // FURRY LABEL
    document.getElementById('furry-label').style.display = raw.includes("furry") ? "block" : "none";

    // BLACKLIST CHECK
    blacklist.forEach(word => {
        if(clean.includes(word)) {
            triggerShutdown();
        }
    });
}

function showTopImg(id) {
    const img = document.getElementById(id);
    img.style.display = "block";
    setTimeout(() => { img.style.display = "none"; }, 4000);
}

function triggerShutdown() {
    isDead = true;
    document.getElementById('idiot-overlay').style.display = "flex";
}

function startProcess() {
    if(isDead) return;
    const res = document.getElementById('final-result');
    const status = document.getElementById('status-bar');
    
    res.innerText = "";
    status.innerText = "PROBÍHÁ ANALÝZA MATRIXU...";
    
    setTimeout(() => {
        status.innerText = "STATUS: SYSTÉM STABILNÍ";
        res.innerText = Math.random() > 0.5 ? "ANO" : "NE";
    }, 1500);
}