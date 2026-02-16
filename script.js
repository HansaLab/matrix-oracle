const blacklist = ["hitler", "motoriste", "žid", "pirati", "ano", "komuniste", "stacilo", "spd", "okamura", "fasismus", "nacismus"];
let isDead = false;
let videoPlayed = false;

function monitorInput(val) {
    if(isDead) return;
    const inputField = document.getElementById('user-input');
    const raw = val.toLowerCase();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // LGBT MÓD - TRVALÝ
    if(raw.includes("lgbt")) {
        document.getElementById('terminal-ui').classList.add('rainbow-mode');
    }

    // RADEK - UŠI NA 2 MINUTY
    if(raw.includes("radek")) {
        document.getElementById('radek-ears-container').style.display = "block";
        setTimeout(() => {
            document.getElementById('radek-ears-container').style.display = "none";
        }, 120000); 
    }

    // FURRY LABEL - TRVALÝ PO ZADÁNÍ
    if (raw.includes("furry")) {
        document.getElementById('furry-label').style.display = "block";
    }

    // FURRY + HONZA/JAN BLOKACE
    if (raw.includes("furry") && (raw.includes("honza") || raw.includes("jan"))) {
        inputField.value = ""; 
        document.getElementById('status-bar').innerText = "ZAKÁZANÁ KOMBINACE!";
        return; 
    }

    // TUREK & MACINKA (Ukázat a pak vyhodit)
    if(raw.includes("macinka")) { 
        showTopImg('macinka-img');
        setTimeout(() => { triggerShutdown(); }, 2500); 
    }
    if(raw.includes("turek")) { 
        showTopImg('turek-img');
        setTimeout(() => { triggerShutdown(); }, 2500); 
    }

    // BITCOIN
    if(clean.includes("med") || clean.includes("zelezo") || clean.includes("kabel")) {
        document.getElementById('bitcoin-container').style.display = "block";
        setTimeout(() => { document.getElementById('bitcoin-container').style.display = "none"; }, 60000);
    }

    // SSSR + HANZ
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

    // BLACKLIST
    blacklist.forEach(word => {
        if(clean.includes(word) && !raw.includes("turek") && !raw.includes("macinka")) {
            triggerShutdown();
        }
    });
}

function showTopImg(id) {
    const img = document.getElementById(id);
    img.style.display = "block";
    setTimeout(() => { if(!isDead) img.style.display = "none"; }, 4000);
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
