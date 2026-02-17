const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust", "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx"
];

let isDead = false;
let lastQuestion = ""; 
let lastAnswer = "";   

// Pomocná funkce pro čištění textu
function getCleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// --- SPECIÁLNÍ MÓD: DUHA ---
function activateRainbow(status) {
    console.log("Aktivuji Duhový mód...");
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

// --- SPECIÁLNÍ MÓD: LUBOŠ ---
function activateLubos(canvas, status) {
    console.log("Aktivuji Lovce...");
    status.innerText = "POZOR, LOVEC JE NA BLÍZKU!";
    
    const styleTarget = document.documentElement.style;
    styleTarget.setProperty('background-image', "url('hunter.jfif')", 'important');
    styleTarget.setProperty('background-size', 'cover', 'important');
    styleTarget.setProperty('background-position', 'center', 'important');
    styleTarget.setProperty('background-repeat', 'no-repeat', 'important');

    if(canvas) {
        canvas.style.display = "none"; // Schováme Matrix kód, aby byl Luboš vidět
    }

    setTimeout(() => {
        styleTarget.setProperty('background-image', 'none');
        if(canvas) canvas.style.display = "block";
    }, 240000);

    return "LOVEC IDENTIFIKOVÁN!";
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

    if(clean.includes("okurka")) {
        if (!document.getElementById('znojmia-left')) {
            const leftOkurka = document.createElement('img');
            leftOkurka.id = 'znojmia-left';
            leftOkurka.src = 'okurka.avif';
            leftOkurka.style = "position:fixed; left:20px; top:50%; transform:translateY(-50%); width:180px; z-index:100; pointer-events:none;";
            document.body.appendChild(leftOkurka);

            const rightOkurka = leftOkurka.cloneNode();
            rightOkurka.id = 'znojmia-right';
            rightOkurka.style.left = "auto";
            rightOkurka.style.right = "20px";
            document.body.appendChild(rightOkurka);
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

    // Paměť otázky
    if (val === lastQuestion && lastAnswer !== "") {
        resultDiv.innerText = lastAnswer;
        status.innerText = "OSUD JE JIŽ DANÝ...";
        return;
    }

    // Cenzura
    if (clean.includes("honza") || clean.includes("jan")) { triggerShutdown(); return; }
    if (blacklist.some(word => clean.includes(getCleanText(word)))) { triggerShutdown(); return; }

    // Kontrola otazníku
    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    let currentAnswer = "";

    // Aktivace speciálních módů
    if (clean.includes("lubos") && clean.includes("lovec")) {
        currentAnswer = activateLubos(canvas, status);
    } 
    
    if (clean.includes("duha") || clean.includes("rainbow")) {
        currentAnswer = activateRainbow(status);
    }

    // Proces analýzy
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
