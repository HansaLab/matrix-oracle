const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "ano", "ods", "pirati", "stan", "kdu", "top09", "spd", "stacilo", "motoriste", "prisaha", "cssd", "kscm", "trikolora", "pro", "zeleni", "svobodni",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "stb", "gulag", "procesy", "milada horakova", "reproduce", "znarodneni", "kolektivizace", "vitezny unor", "srp a kladivo", "politicky vezeni"
];

let isDead = false;

function monitorInput(val) {
    if(isDead) return;
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // KONTROLA BLACKLISTU PŘI PSANÍ
    blacklist.forEach(word => {
        if(clean.includes(word)) triggerShutdown();
    });

    // DYNAMICKÉ VLOŽENÍ UŠÍ
    const terminal = document.querySelector('.terminal');
    if(clean.includes("radek")) {
        if (!document.getElementById('radek-ears')) {
            const earsImg = document.createElement('img');
            earsImg.id = 'radek-ears';
            earsImg.src = 'radek.gif';
            earsImg.className = 'ears-style';
            terminal.appendChild(earsImg);
            
            // Po 1 minutě uši zmizí
            setTimeout(() => { if(earsImg) earsImg.remove(); }, 60000);
        }
    }
}

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

    // POJISTKA BLACKLISTU PŘI KLIKNUTÍ (např. pro slovo lenin)
    let blocked = false;
    blacklist.forEach(word => {
        if(clean.includes(word)) {
            triggerShutdown();
            blocked = true;
        }
    });
    if(blocked) return;

    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        return;
    }

    document.getElementById('final-result').innerText = "";
    status.style.color = "#00ff41";
    status.innerText = "PROHLEDÁVÁM MATRIX...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        const pos = ["ANO", "URČITĚ", "ROZHODNĚ", "BEZPOCHYBY"];
        const neg = ["NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "VYLOUČENO"];
        
        let answer = Math.random() > 0.5 ? pos[Math.floor(Math.random()*pos.length)] : neg[Math.floor(Math.random()*neg.length)];
        
        // Speciální odpověď pro Radka
        if(clean.includes("radek")) answer = "JASNÝ ANO";

        document.getElementById('final-result').innerText = answer;
    }, 1500);
}
