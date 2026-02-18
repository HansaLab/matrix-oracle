const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "SS", "gestapo", "holocaust", "Göring", "Jews", "žid", "SA", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx",
    "rakousky malir"
];

const weirdWords = ["sex", "porno", "uchyl", "nahota", "pedofil", "pusa", "laska", "gay", "bi", "trans", "divny"];

let isDead = false;
let lastQuestion = ""; 
let lastAnswer = "";   

function getCleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Funkce pro vizuální změny na pozadí
function setBackgroundVisual(url, durationMs) {
    const styleTarget = document.documentElement.style;
    const canvas = document.querySelector('canvas');

    styleTarget.setProperty('background-image', `url('${url}')`, 'important');
    styleTarget.setProperty('background-size', 'cover', 'important');
    styleTarget.setProperty('background-position', 'center', 'important');
    styleTarget.setProperty('background-repeat', 'no-repeat', 'important');
    
    // Schováme Matrix déšť, aby byl vidět GIF
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
    if (!val) return;

    const clean = getCleanText(val);
    const inputWords = clean.replace(/[?]/g, "").split(/\s+/);

    // --- 1. KONTROLA BLACKLISTU (POUZE CELÁ SLOVA) ---
    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        // Pokud je v blacklistu fráze (víc slov), kontrolujeme celou větu
        if (cleanBadWord.includes(" ")) return clean.includes(cleanBadWord);
        // Jinak kontrolujeme pouze SHODU CELÝCH SLOV (aby prošel Tomáš)
        return inputWords.includes(cleanBadWord);
    });

    if (isBanned || inputWords.includes("honza") || inputWords.includes("jan")) { 
        triggerShutdown(); 
        return; 
    }

    // --- 2. SPECIÁLNÍ GIF REAKCE (SPOUŠTÍ SE HNED) ---
    let currentAnswer = "";

    if (clean.includes("plant") && clean.includes("bomb")) {
        setBackgroundVisual('dance.gif', 300000); // 5 minut
        status.innerText = "BOMBA POLOŽENA. PARTY ZAČÍNÁ...";
        currentAnswer = "DANCE TIME !";
    } 
    else if (weirdWords.some(word => inputWords.includes(word))) {
        setBackgroundVisual('hmm.gif', 10000); // 10 sekund
        status.innerText = "HMM... TO JE DOST DIVNÝ DOTAZ.";
        currentAnswer = "EHM... RADŠI SE NEPTEJ.";
    }
    else if (clean.includes("lubos") && clean.includes("lovec")) {
        setBackgroundVisual('hunter.jfif', 240000);
        status.innerText = "POZOR, LOVEC JE NA BLÍZKU!";
        currentAnswer = "LOVEC IDENTIFIKOVÁN!";
    } 
    else if (clean.includes("duha") || clean.includes("rainbow")) {
        currentAnswer = activateRainbow(status);
    }

    // --- 3. KONTROLA OTAZNÍKU (POKUD NEJDE O SPECIÁLNÍ GIF) ---
    if (!val.endsWith('?') && !currentAnswer) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    // --- 4. FINÁLNÍ ANALÝZA ---
    if (val === lastQuestion && lastAnswer !== "" && !currentAnswer) {
        resultDiv.innerText = lastAnswer;
        status.innerText = "OSUD JE JIŽ DANÝ...";
        return;
    }

    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    
    // Pokud už máme odpověď (z GIFu), rovnou ji vypíšeme po pauze
    if (currentAnswer) {
        setTimeout(() => {
            status.innerText = "VÝSLEDEK NALEZEN!";
            resultDiv.innerText = currentAnswer;
            lastQuestion = val;
            lastAnswer = currentAnswer;
        }, 1000);
        return;
    }

    // Klasické hledání v Matrixu
    status.innerText = "PROHLEDÁVÁM MATRIX...";
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        
        if (clean.includes("furry") && clean.includes("coufal")) {
            currentAnswer = "Coufal 100% FURRY";
        } else if (clean.includes("radek")) {
            currentAnswer = "JASNÝ ANO";
        } else {
            const answers = ["ANO", "URČITĚ", "ROZHODNĚ", "BEZPOCHYBY", "NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "VYLOUČENO"];
            currentAnswer = answers[Math.floor(Math.random() * answers.length)];
        }

        lastQuestion = val;
        lastAnswer = currentAnswer;
        resultDiv.innerText = currentAnswer;
    }, 1500);
}
