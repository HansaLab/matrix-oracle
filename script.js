// EXTRÉMNĚ ROZŠÍŘENÝ BLACKLIST
const blacklist = [
    // Původní a nacisté
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust",
    // Politici, které jsi chtěl blokovat
    "turek", "macinka", "konecná", "okamura", "babiš", "fiala", "rajschl",
    // Politické strany a hnutí (parlamentní i další)
    "ano", "ods", "pirati", "stan", "kdu", "top09", "spd", "stacilo", "motoriste", "prisaha", "cssd", "kscm", "trikolora", "pro", "zeleni", "svobodni",
    // Komunismus a jeho činy/symboly
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "stb", "gulag", "procesy", "milada horakova", "represe", "znarodneni", "kolektivizace", "vitezny unor", "srp a kladivo", "politicky vezeni"
];

let isDead = false;
let videoPlayed = false;

function monitorInput(val) {
    if(isDead) return;
    const raw = val.toLowerCase();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // 1. RADEK UŠI
    if(raw.includes("radek")) {
        const container = document.getElementById('radek-ears-container');
        if (container && container.innerHTML === "") {
            container.innerHTML = '<img src="radek.gif" style="width:100%">';
            setTimeout(() => { container.innerHTML = ""; }, 120000); 
        }
    }

    // 2. COUFAL / FURRY
    if (clean.includes("furry") || clean.includes("coufal")) {
        document.getElementById('furry-label').style.display = "block";
    }

    // 3. VIDEO: LUBOŠEK + HUNTER
    if (clean.includes("lubosek") && clean.includes("hunter") && !videoPlayed) {
        playVideo("https://www.youtube.com/embed/l2pw-TiT4Tk?autoplay=1", 59000);
    }

    // 4. SSSR + HANZ
    if (clean.includes("sssr") && clean.includes("hanz") && !videoPlayed) {
        playVideo("https://www.youtube.com/embed/UKrA8hv8dvE?autoplay=1", 52000);
    }

    // 5. KONTROLA BLACKLISTU
    // Procházíme seznam a pokud "clean" vstup obsahuje zakázané slovo, konec.
    blacklist.forEach(word => {
        if(clean.includes(word)) triggerShutdown();
    });
}

function playVideo(url, duration) {
    videoPlayed = true;
    const overlay = document.getElementById('video-overlay');
    const iframe = document.getElementById('secret-video');
    if (overlay && iframe) {
        iframe.src = url; 
        overlay.style.display = "flex";
        setTimeout(() => { 
            overlay.style.display = "none"; 
            iframe.src = ""; 
            videoPlayed = false; 
        }, duration);
    }
}

function triggerShutdown() { 
    isDead = true; 
    const idiot = document.getElementById('idiot-overlay');
    if (idiot) idiot.style.display = "flex"; 
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
        if(i >= steps.length) { 
            clearInterval(loader); 
            finishResult(input); 
        }
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
