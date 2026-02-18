const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust", "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx",
    "rakousky malir"
];

const weirdWords = ["sex", "porno", "uchyl", "nahota", "pedofil", "pusa", "laska", "gay", "bi", "trans"];

let isDead = false;
let lastQuestion = ""; 
let lastAnswer = "";   

// Pomocná funkce pro čištění textu (bez diakritiky a malá písmena)
function getCleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Funkce pro zobrazení GIFů na pozadí (Dance, Hmm)
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

// Sledování vstupu pro uši (Radek)
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

    const val = inputField.value.trim();
    if (!val) return;

    const clean = getCleanText(val);
    const inputWords = clean.replace(/[?]/g, "").split(/\s+/);

    // --- 1. PAMĚŤ OTÁZKY (Fix pro stejnou odpověď) ---
    if (val === lastQuestion && lastAnswer !== "") {
        resultDiv.innerText = lastAnswer;
        status.innerText = "OSUD JE JIŽ DANÝ...";
        status.style.color = "#00ff41";
        return;
    }

    // --- 2. BLACKLIST (Fix pro Tomáše) ---
    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        // Pokud kontrolujeme "as", musí to být celé slovo
        if (cleanBadWord === "as") return inputWords.includes("as");
        // U víceslovných (rakouský malíř) nebo delších slov kontrolujeme výskyt
        if (cleanBadWord.includes(" ")) return clean.includes(cleanBadWord);
        return inputWords.includes(cleanBadWord);
    });

    if (isBanned || inputWords.includes("honza") || inputWords.includes("jan")) { 
        triggerShutdown(); 
        return; 
    }

    let currentAnswer = "";

    // --- 3. SPECIÁLNÍ GIF REAKCE ---
    if (clean.includes("plant") && clean.includes("bomb")) {
        setBackgroundVisual('dance.gif', 300000); 
        status.innerText = "BOMBA POLOŽENA. PARTY ZAČÍNÁ...";
        currentAnswer = "DANCE TIME !";
    } 
    else if (weirdWords.some(word => inputWords.includes(word))) {
        setBackgroundVisual('hmm.gif', 10000); 
        status.innerText = "HMM... TO JE DOST DIVNÝ DOTAZ.";
        currentAnswer = "EHM... RADŠI SE NEPTEJ.";
    }

    // --- 4. KONTROLA OTAZNÍKU ---
    // Pokud uživatel nenapsal speciální příkaz (jako bomba), musí tam být otazník
    if (!val.endsWith('?') && !currentAnswer) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    // --- 5. GENEROVÁNÍ VÝSLEDKU ---
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    status.innerText = "PROHLEDÁVÁM MATRIX...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        
        // Pokud nemáme odpověď z GIFu, vybereme náhodnou
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

        // ULOŽENÍ DO PAMĚTI
        lastQuestion = val;
        lastAnswer = currentAnswer;
        resultDiv.innerText = currentAnswer;
    }, 1200);
}
