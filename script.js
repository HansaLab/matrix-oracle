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

// FUNKCE PRO ZMĚNU POZADÍ
function setBackgroundVisual(gifName, durationMs) {
    // Změna pozadí přímo na elementu body
    document.body.style.backgroundImage = "url('" + gifName + "')";
    
    setTimeout(() => {
        // Návrat k původnímu matrix pozadí
        document.body.style.backgroundImage = "url('pozadi.gif')";
    }, durationMs);
}

function triggerShutdown() {
    isDead = true;
    const overlay = document.getElementById('idiot-overlay');
    if (overlay) overlay.style.display = "flex";
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

    // KONTROLA BLACKLISTU (Oprava pro Tomáše)
    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        // "as" blokujeme jen jako samostatné slovo
        if (cleanBadWord === "as") return inputWords.includes("as");
        return clean.includes(cleanBadWord);
    });

    if (isBanned || inputWords.includes("honza") || inputWords.includes("jan")) { 
        triggerShutdown(); 
        return; 
    }

    let currentAnswer = "";

    // SPECIÁLNÍ GIF REAKCE
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

    // KONTROLA OTAZNÍKU
    if (!val.endsWith('?') && !currentAnswer) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    // ANALÝZA
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        if (!currentAnswer) {
            const answers = ["ANO", "URČITĚ", "ROZHODNĚ", "NE", "NIKDY", "VYLOUČENO"];
            currentAnswer = answers[Math.floor(Math.random() * answers.length)];
        }
        resultDiv.innerText = currentAnswer;
    }, 1000);
}
