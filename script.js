const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust", "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx",
    "rakousky malir"
];

// Seznam slov, která spustí "hmm" GIF
const weirdWords = ["sex", "porno", "uchyl", "nahota", "pedofil", "pusa", "laska", "gay", "bi", "trans"];

let isDead = false;
let lastQuestion = ""; 
let lastAnswer = "";   

function getCleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Pomocná funkce pro přepínání pozadí (GIF/Obrázek)
function setBackgroundVisual(url, durationMs, isLubos = false) {
    const styleTarget = document.documentElement.style;
    const canvas = document.querySelector('canvas');

    styleTarget.setProperty('background-image', `url('${url}')`, 'important');
    styleTarget.setProperty('background-size', 'cover', 'important');
    styleTarget.setProperty('background-position', 'center', 'important');
    styleTarget.setProperty('background-repeat', 'no-repeat', 'important');
    
    if(canvas) canvas.style.display = "none"; 

    setTimeout(() => {
        styleTarget.setProperty('background-image', 'none');
        if(canvas) canvas.style.display = "block"; 
    }, durationMs);
}

function activateRainbow(status) {
    status.innerText = "SPOUŠTÍM DUHOVÝ PROTOKOL...";
    let hue = 0;
    const interval = setInterval(() => {
        hue = (hue + 8) % 360;
        document.documentElement.style.setProperty('filter', `hue-rotate(${hue}deg)`, 'important');
    }, 40);
    setTimeout(() => {
        clearInterval(interval);
        document.documentElement.style.filter = "none";
    }, 30000);
    return "OCHUTNEJ DUHU!";
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
            earsImg.className = 'ears-style';
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
    const canvas = document.querySelector('canvas');

    if(!inputField || !status || !resultDiv) return;

    const val = inputField.value.trim();
    const clean = getCleanText(val);
    const inputWords = clean.replace(/[?]/g, "").split(/\s+/);

    if (val === lastQuestion && lastAnswer !== "") {
        resultDiv.innerText = lastAnswer;
        status.innerText = "OSUD JE JIŽ DANÝ...";
        return;
    }

    // --- CENZURA A BLACKLIST ---
    const forbiddenPeople = ["honza", "jan"];
    if (inputWords.some(word => forbiddenPeople.includes(word))) { 
        triggerShutdown(); 
        return; 
    }

    if (blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        return inputWords.includes(cleanBadWord) || clean.includes(cleanBadWord);
    })) { 
        triggerShutdown(); 
        return; 
    }

    // --- SPECIÁLNÍ GIF REAKCE ---
    let currentAnswer = "";

    // 1. Plant a bomb -> Dance GIF na 5 minut (300 000 ms)
    if (clean.includes("plant") && clean.includes("bomb")) {
        setBackgroundVisual('dance.gif', 300000);
        status.innerText = "BOMBA POLOŽENA. PARTY ZAČÍNÁ...";
        currentAnswer = "DANCE TIME!";
    }

    // 2. Divné věci -> Hmm GIF na 10 sekund
    if (weirdWords.some(word => clean.includes(word))) {
        setBackgroundVisual('hmm.gif', 10000);
        status.innerText = "HMM... TO JE DOST DIVNÝ DOTAZ.";
        currentAnswer = "EHM... RADŠI SE NEPTEJ.";
    }

    // Kontrola otazníku
    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    // Aktivace dalších módů (Luboš / Duha)
    if (clean.includes("lubos") && clean.includes("lovec")) {
        setBackgroundVisual('hunter.jfif', 240000);
        status.innerText = "POZOR, LOVEC JE NA BLÍZKU!";
        currentAnswer = "LOVEC IDENTIFIKOVÁN!";
    } 
    
    if (clean.includes("duha") || clean.includes("rainbow")) {
        currentAnswer = activateRainbow(status);
    }

    // Proces analýzy (pokud už nebyla nastavena speciální odpověď z GIFu)
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    if (!currentAnswer) status.innerText = "PROHLEDÁVÁM MATRIX...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";

        if (!currentAnswer) {
            if (clean.includes("furry") && clean.includes("coufal")) {
                currentAnswer = "Coufal 100% FURRY";
            } else if (clean.includes("radek")) {
                currentAnswer = "JASNÝ ANO";
            } else {
                const answers = ["ANO", "URČITĚ", "ROZHODNĚ", "BEZPOCHYBY", "NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "VYLOUČENO"];
                currentAnswer = answers[Math.floor(Math.random() * answers.length)];
            }
        }

        lastQuestion = val;
        lastAnswer = currentAnswer;
        resultDiv.innerText = currentAnswer;
    }, 1500);
}
