const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust", "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx",
    "rakousky malir"
];

const weirdWords = ["sex", "porno", "uchyl", "nahota", "pedofil", "pusa", "laska", "gay", "trans"];

let isDead = false;
let lastQuestion = ""; 
let lastAnswer = "";   

function getCleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// POMOCNÁ FUNKCE PRO CELOOBRAZOVKOVÉ GIFy (Dance, Hmm)
function setBackgroundVisual(url, durationMs) {
    const oldGif = document.getElementById('active-special-gif');
    if(oldGif) oldGif.remove();

    const gifImg = document.createElement('img');
    gifImg.src = url;
    gifImg.id = 'active-special-gif';
    gifImg.className = 'special-bg-gif';
    
    document.body.appendChild(gifImg);

    setTimeout(() => {
        const img = document.getElementById('active-special-gif');
        if(img) img.remove();
    }, durationMs);
}

// MONITOROVÁNÍ PSANÍ (Radek)
function monitorInput(val) {
    if(isDead) return;
    const clean = getCleanText(val);
    const terminal = document.querySelector('.terminal');

    if(clean.includes("radek")) {
        if (!document.getElementById('radek-ears')) {
            const earsImg = document.createElement('img');
            earsImg.id = 'radek-ears';
            earsImg.src = 'radek.gif'; 
            earsImg.className = 'ears-style'; // Použije styl z CSS
            
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

    // --- OPRAVENÝ BLACKLIST (Tomáš povolen) ---
    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        if (cleanBadWord === "as") return inputWords.includes("as");
        return clean.includes(cleanBadWord);
    });

    if (isBanned || inputWords.includes("honza") || inputWords.includes("jan")) { 
        triggerShutdown(); 
        return; 
    }

    let currentAnswer = "";

    // --- SPECIÁLNÍ REAKCE ---
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

    // --- ANALÝZA VÝSLEDKU ---
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        if (!currentAnswer) {
            const answers = ["ANO", "URČITĚ", "ROZHODNĚ", "NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ"];
            currentAnswer = answers[Math.floor(Math.random() * answers.length)];
        }
        resultDiv.innerText = currentAnswer;
        lastQuestion = val;
        lastAnswer = currentAnswer;
    }, 1000);
}
