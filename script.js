// --- OPRAVENÝ MOD: DUHA ---
function activateRainbow(status) {
    console.log("Aktivuji Duhový mód..."); // Uvidíš v konzoli (F12)
    status.innerText = "SPOUŠTÍM DUHOVÝ PROTOKOL...";
    
    let hue = 0;
    // Musíme barvit přímo hlavní kontejner nebo body s vysokou prioritou
    const interval = setInterval(() => {
        hue = (hue + 8) % 360;
        // Použijeme !important přes setProperty, aby to nic nepřebilo
        document.documentElement.style.setProperty('filter', `hue-rotate(${hue}deg)`, 'important');
    }, 40);

    setTimeout(() => {
        clearInterval(interval);
        document.documentElement.style.filter = "none";
    }, 30000);
    
    return "OCHUTNEJ DUHU!";
}

// --- OPRAVENÝ MOD: LUBOŠ ---
function activateLubos(canvas, status) {
    console.log("Aktivuji Lovce..."); // Uvidíš v konzoli (F12)
    status.innerText = "POZOR, LOVEC JE NA BLÍZKU!";
    
    document.body.style.setProperty('background-image', "url('hunter.jfif')", 'important');
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundColor = "black";

    if(canvas) {
        canvas.style.transition = "opacity 1s";
        canvas.style.opacity = "0.2"; // Matrix déšť skoro zmizí, aby byl vidět Luboš
    }

    setTimeout(() => {
        document.body.style.backgroundImage = "none";
        if(canvas) canvas.style.opacity = "1";
    }, 240000);

    return "LOVEC IDENTIFIKOVÁN!";
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

    // 1. Cenzura
    if (clean.includes("honza") || clean.includes("jan")) { triggerShutdown(); return; }
    if (blacklist.some(word => clean.includes(getCleanText(word)))) { triggerShutdown(); return; }

    // 2. Kontrola otazníku
    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    let currentAnswer = "";

    // 3. Spouštění módů (přesunuto do funkcí pro čistotu)
    if (clean.includes("lubos") && clean.includes("lovec")) {
        currentAnswer = activateLubos(canvas, status);
    } 
    
    if (clean.includes("duha") || clean.includes("rainbow")) {
        currentAnswer = activateRainbow(status);
    }

    // 4. Animace "Prohledávám"
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
