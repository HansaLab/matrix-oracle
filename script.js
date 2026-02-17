const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust", "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx"
];

let isDead = false;
let lastQuestion = ""; 
let lastAnswer = "";   

function getCleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function monitorInput(val) {
    if(isDead) return;
    const clean = getCleanText(val);
    const terminal = document.querySelector('.terminal');

    // Velikonoční vajíčko: Radek (Uši)
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

    // Velikonoční vajíčko: Okurky Znojmia
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

    // --- PAMĚŤ OTÁZKY ---
    if (val === lastQuestion && lastAnswer !== "") {
        resultDiv.innerText = lastAnswer;
        status.innerText = "OSUD JE JIŽ DANÝ...";
        status.style.color = "#00ff41";
        return;
    }

    // Cenzura
    if (clean.includes("honza") || clean.includes("jan")) { triggerShutdown(); return; }
    const isBlocked = blacklist.some(word => clean.includes(getCleanText(word)));
    if(isBlocked) { triggerShutdown(); return; }

    // Kontrola otazníku
    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    // --- MOD: LUBOŠ A LOVEC (OPRAVENO) ---
    if (clean.includes("lubos") && clean.includes("lovec")) {
        document.body.style.setProperty('background-image', "url('hunter.jfif')", 'important');
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        if(canvas) canvas.style.opacity = "0.3"; // Aby prosvítal obrázek pod deštěm

        status.innerText = "POZOR, LOVEC JE NA BLÍZKU!";
        
        setTimeout(() => { 
            document.body.style.backgroundImage = "none";
            if(canvas) canvas.style.opacity = "1.0";
        }, 240000);
    }

    // --- MOD: DUHA (OPRAVENO) ---
    if (clean.includes("duha") || clean.includes("rainbow")) {
        status.innerText = "SPOUŠTÍM DUHOVÝ PROTOKOL...";
        let hue = 0;
        const rainbowInterval = setInterval(() => {
            hue = (hue + 5) % 360;
            document.body.style.filter = `hue-rotate(${hue}deg)`;
        }, 30);

        setTimeout(() => { 
            clearInterval(rainbowInterval); 
            document.body.style.filter = "none";
        }, 30000);
    }

    // Proces analýzy
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    status.innerText = "PROHLEDÁVÁM MATRIX...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        let currentAnswer = "";

        // Fixní odpovědi
        if (clean.includes("furry") && clean.includes("coufal")) {
            currentAnswer = "Coufal 100% FURRY";
        } 
        else if (clean.includes("radek")) {
            currentAnswer = "JASNÝ ANO";
        } 
        else {
            const answers = ["ANO", "URČITĚ", "ROZHODNĚ", "BEZPOCHYBY", "NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "VYLOUČENO"];
            currentAnswer = answers[Math.floor(Math.random() * answers.length)];
        }

        lastQuestion = val;
        lastAnswer = currentAnswer;
        resultDiv.innerText = currentAnswer;
    }, 1500);
}
