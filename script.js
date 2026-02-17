const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust",  "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "ano", "ods", "pirati", "okamura", "kdu", "top09", "spd", "stacilo", "motoriste", "prisaha", "cssd", "kscm", "trikolora", "Tomio", "zeleni", "svobodni", "Petr Pavel", "jemnice",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "stb", "gulag", "procesy", "kdu-čsl", "zabít", "znarodneni", "kolektivizace", "vitezny unor", "srp a kladivo", "politicky vezeni"
];

let isDead = false;

// OKAMŽITÝ EFEKT PŘI PSANÍ
function monitorInput(val) {
    if(isDead) return;
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const terminal = document.querySelector('.terminal');

    if(clean.includes("radek")) {
        if (!document.getElementById('radek-ears')) {
            const earsImg = document.createElement('img');
            earsImg.id = 'radek-ears';
            earsImg.src = 'radek.gif'; 
            earsImg.className = 'ears-style';
            terminal.appendChild(earsImg);
            
            setTimeout(() => { if(earsImg) earsImg.remove(); }, 60000);
        }
    }
}

function triggerShutdown() {
    isDead = true;
    document.getElementById('idiot-overlay').style.display = "flex";
}

// EFEKTY PO STISKNUTÍ TLAČÍTKA
function startProcess() {
    if(isDead) return;
    const inputField = document.getElementById('user-input');
    const val = inputField.value.trim();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const status = document.getElementById('status-bar');

    // Kontrola blokovaných jmen
    if (clean.includes("honza") || clean.includes("jan")) {
        triggerShutdown();
        return;
    }

    let blocked = false;
    blacklist.forEach(word => {
        if(clean.includes(word)) {
            triggerShutdown();
            blocked = true;
        }
    });
    if(blocked) return;

    // Povinný otazník
    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        return;
    }

    // Hunter pozadí
    if (clean.includes("lubos") && clean.includes("hunter")) {
        document.body.style.backgroundImage = "url('hunter.jfif')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        setTimeout(() => { document.body.style.backgroundImage = "none"; }, 10000);
    }

    // Duhový mód
    if (clean.includes("duha")) {
        document.body.classList.add("rainbow-mode");
    }

    // Furry nápis
    if (clean.includes("furry") || clean.includes("coufal")) {
        const label = document.getElementById('furry-label');
        label.style.display = "block";
        setTimeout(() => { label.style.display = "none"; }, 480000);
    }

    // Proces analýzy
    document.getElementById('final-result').innerText = "";
    status.style.color = "#00ff41";
    status.innerText = "PROHLEDÁVÁM MATRIX...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        const pos = ["ANO", "URČITĚ", "ROZHODNĚ", "BEZPOCHYBY"];
        const neg = ["NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "VYLOUČENO"];
        
        let answer = Math.random() > 0.5 ? pos[Math.floor(Math.random()*pos.length)] : neg[Math.floor(Math.random()*neg.length)];
        if(clean.includes("radek")) answer = "JASNÝ ANO";
        document.getElementById('final-result').innerText = answer;
    }, 1500);
}


