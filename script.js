const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "ano", "ods", "pirati", "stan", "kdu", "top09", "spd", "stacilo", "motoriste", "prisaha", "cssd", "kscm", "trikolora", "pro", "zeleni", "svobodni",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "stb", "gulag", "procesy", "milada horakova", "reproduce", "znarodneni", "kolektivizace", "vitezny unor", "srp a kladivo", "politicky vezeni"
];

let isDead = false;

function triggerShutdown() {
    isDead = true;
    document.getElementById('idiot-overlay').style.display = "flex";
}

function startProcess() {
    if(isDead) return;
    const inputField = document.getElementById('user-input');
    const val = inputField.value.trim();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const status = document.getElementById('status-bar');
    const terminal = document.querySelector('.terminal');

    // 1. BLOKACE: Honza / Jan
    if (clean.includes("honza") || clean.includes("jan")) {
        triggerShutdown();
        return;
    }

    // 2. KONTROLA BLACKLISTU
    let blocked = false;
    blacklist.forEach(word => {
        if(clean.includes(word)) {
            triggerShutdown();
            blocked = true;
        }
    });
    if(blocked) return;

    // 3. POVINNÝ OTAZNÍK
    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        return;
    }

    // --- SPECIÁLNÍ ÚČINKY ---

    // Luboš + Hunter (Pozadí na 10s)
    if (clean.includes("lubos") && clean.includes("hunter")) {
        document.body.style.backgroundImage = "url('hunter.jfif')";
        document.body.style.backgroundSize = "cover";
        setTimeout(() => { document.body.style.backgroundImage = "none"; }, 10000);
    }

    // Duha (Navždy do F5)
    if (clean.includes("duha")) {
        document.body.classList.add("rainbow-mode");
    }

    // Furry / Coufal (Nápis na 8 min)
    if (clean.includes("furry") || clean.includes("coufal")) {
        const label = document.getElementById('furry-label');
        label.style.display = "block";
        setTimeout(() => { label.style.display = "none"; }, 480000);
    }

    // Radek (Uši na 1 minutu)
    if(clean.includes("radek")) {
        if (!document.getElementById('radek-ears')) {
            const earsImg = document.createElement('img');
            earsImg.id = 'radek-ears';
            earsImg.src = 'radek (1).gif';
            earsImg.className = 'ears-style';
            terminal.appendChild(earsImg);
            setTimeout(() => { if(earsImg) earsImg.remove(); }, 60000);
        }
    }

    // --- PROCES ANALÝZY ---
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
