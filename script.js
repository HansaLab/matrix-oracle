const blacklist = ["hitler", "motoriste", "zide", "zid", "nsdap", "pirati", "ano", "komuniste", "stacilo", "spd", "okamura", "fasismus", "nacismus"];
let isDead = false;
let videoPlayed = false;

function monitorInput(val) {
    if(isDead) return;
    const raw = val.toLowerCase();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // LGBT
    if(raw.includes("lgbt")) document.getElementById('terminal-ui').classList.add('rainbow-mode');
    
    // RADEK
    if(raw.includes("radek") && !document.querySelector('#radek-ears-container img')) {
        document.getElementById('radek-ears-container').innerHTML = '<img src="radek.gif" style="width:100%">';
        setTimeout(() => { document.getElementById('radek-ears-container').innerHTML = ""; }, 120000); 
    }

    // FURRY / COUFAL
    if (clean.includes("furry") || clean.includes("coufal")) {
        document.getElementById('furry-label').style.display = "block";
    }

    // LUBOŠEK + HUNTER
    if (clean.includes("lubosek") && clean.includes("hunter") && !videoPlayed) {
        playVideo("https://www.youtube.com/embed/l2pw-TiT4Tk?autoplay=1", 59000);
    }

    // TUREK / MACINKA
    if(raw.includes("macinka") && !isDead) {
        document.getElementById('top-image-container').innerHTML = '<img src="kokot.jpg">';
        setTimeout(() => triggerShutdown(), 2500);
    }
    if(raw.includes("turek") && !isDead) {
        document.getElementById('top-image-container').innerHTML = '<img src="debil.jfif">';
        setTimeout(() => triggerShutdown(), 2500);
    }

    // BITCOIN
    if((clean.includes("med") || clean.includes("zelezo")) && !document.querySelector('#bitcoin-container img')) {
        document.getElementById('bitcoin-container').innerHTML = '<img src="bitcoin.jpg" style="max-width:600px; border-bottom:3px solid #cd7f32;">';
        setTimeout(() => { document.getElementById('bitcoin-container').innerHTML = ""; }, 60000);
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

function triggerShutdown() { 
    isDead = true; 
    document.getElementById('idiot-overlay').style.display = "flex"; 
}

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
        if(i >= steps.length) { clearInterval(loader); finishResult(input); }
    }, 800);
}

function finishResult(input) {
    const res = document.getElementById('final-result');
    const raw = input.toLowerCase();
    const pos = ["ANO", "URČITĚ", "JASNÁ VĚC", "ROZHODNĚ"];
    const neg = ["NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "VYLOUČENO"];
    
    let ans = Math.random() > 0.5 ? pos[Math.floor(Math.random()*pos.length)] : neg[Math.floor(Math.random()*neg.length)];
    
    if ((raw.includes("koci") || raw.includes("kocourek")) && raw.includes("idiot")) ans = "JASNÝ ANO";
    if (raw.includes("radek") && raw.includes("uši")) ans = "URČITĚ ANO";
    
    res.innerText = ans;
}
