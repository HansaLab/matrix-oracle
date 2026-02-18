const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust", "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx",
    "rakousky malir"
];

const weirdWords = ["sex", "porno", "uchyl", "nahota", "pedofil", "pusa", "laska"];

let isDead = false;

function getCleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// FUNKCE PRO ZOBRAZENÍ GIFŮ (Stejný princip jako u Radka)
function setBackgroundVisual(url, durationMs) {
    // Pokud už nějaký speciální GIF běží, smažeme ho, aby se nekryly
    const oldGif = document.getElementById('active-special-gif');
    if(oldGif) oldGif.remove();

    const gifImg = document.createElement('img');
    gifImg.src = url;
    gifImg.id = 'active-special-gif';
    gifImg.className = 'special-bg-gif'; // Styl z CSS
    
    document.body.appendChild(gifImg);

    setTimeout(() => {
        const img = document.getElementById('active-special-gif');
        if(img) img.remove();
    }, durationMs);
}

function monitorInput(val) {
    if(isDead) return;
    const clean = getCleanText(val);
    const terminal = document.querySelector('.terminal');

    if(clean.includes("radek")) {
        if (!document.getElementById('radek-ears')) {
            const earsImg = document.createElement('img');
            earsImg.id = 'radek-ears';
            earsImg.src = 'radek.gif'; 
            earsImg.style = "position:absolute; top:-140px; left:50%; transform:translateX(-50%); width:320px; z-index:20; pointer-events:none;";
            if(terminal) terminal.appendChild(earsImg);
            setTimeout(() => { 
                const e = document.getElementById('radek-ears');
                if(e) e.remove(); 
            }, 60000);
        }
    }
}

function triggerShutdown() {
    isDead = true;
    const overlay = document.getElementById('idiot-overlay');
    if(overlay) overlay.style.display = "flex";
}

function startProcess() {
    if(isDead) return;

    const inputField = document.getElementById('user-input');
    const status = document.getElementById('status-bar');
    const resultDiv = document.getElementById('final-result');

    const val = inputField.value.trim();
    if (!val) return;

    const clean = getCleanText(val);
    const inputWords = clean.replace(/[?]/g, "").split(/\s+/);

    // --- OPRAVENÝ BLACKLIST (Tomáš už funguje!) ---
    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        // "as" zabanujeme jen pokud je to samostatné slovo
        if (cleanBadWord === "as") return inputWords.includes("as");
        return clean.includes(cleanBadWord);
    });

    if (isBanned || inputWords.includes("honza") || inputWords.includes("jan")) { 
        triggerShutdown(); 
        return; 
    }

    let currentAnswer = "";

    // --- SPECIÁLNÍ GIF REAKCE ---
    if (clean.includes("plant") && clean.includes("bomb")) {
        setBackgroundVisual('dance.gif', 300000); 
        status.innerText = "BOMBA POLOŽENA. PARTY ZAČÍNÁ...";
        currentAnswer = "DANCE TIME !";
    } 
    else if (weirdWords.some(word => clean.includes(word))) {
        setBackgroundVisual('hmm.gif', 10000); 
        status.innerText = "HMM... TO JE DOST DIVNÝ DOTAZ.";
        currentAnswer = "EHM... RADŠI SE NEPTEJ.";
    }

    // --- KONTROLA OTAZNÍKU ---
    if (!val.endsWith('?') && !currentAnswer) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    // --- ANALÝZA ---
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        if (!currentAnswer) {
            const answers = ["ANO", "URČITĚ", "ROZHODNĚ", "NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ"];
            currentAnswer = answers[Math.floor(Math.random() * answers.length)];
        }
        resultDiv.innerText = currentAnswer;
    }, 1000);
}
