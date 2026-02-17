const blacklist = [
    "hitler", "nsdap", "fasismus", "nacismus", "goring", "himler", "heinrich", "goebbels", "ss", "gestapo", "holocaust", "Göring", "Jews", "žid", "as", "kill",
    "turek", "macinka", "konecna", "okamura", "babis", "fiala", "rajschl",
    "pirati", "spd", "stacilo", "motoriste", "prisaha",
    "komuniste", "komunismus", "stalin", "lenin", "gottwald", "mao", "marx"
];

let isDead = false;
let lastQuestion = ""; 
let lastAnswer = "";   

// Tato funkce MUSÍ existovat, protože ji volá index.html přes oninput
function monitorInput(val) {
    if(isDead) return;
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
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

    // Velikonoční vajíčko: Okurka Znojmia
    if(clean.includes("okurka")) {
        if (!document.getElementById('znojmia-left')) {
            const leftOkurka = document.createElement('img');
            leftOkurka.id = 'znojmia-left';
            leftOkurka.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pickle.svg/1200px-Pickle.svg.png'; 
            leftOkurka.style = "position:fixed; left:10px; top:50%; transform:translateY(-50%); width:100px; z-index:100;";
            document.body.appendChild(leftOkurka);

            const rightOkurka = leftOkurka.cloneNode();
            rightOkurka.id = 'znojmia-right';
            rightOkurka.style.left = "auto";
            rightOkurka.style.right = "10px";
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

    if(!inputField || !status || !resultDiv) return;

    const val = inputField.value.trim();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // 1. KONTROLA PAMĚTI (Pokud je otázka stejná, nepouštěj novou analýzu)
    if (val === lastQuestion && lastAnswer !== "") {
        resultDiv.innerText = lastAnswer;
        status.innerText = "VÝSLEDEK ZŮSTÁVÁ STEJNÝ";
        return;
    }

    // 2. CENZURA
    if (clean.includes("honza") || clean.includes("jan")) {
        triggerShutdown();
        return;
    }

    let blocked = false;
    blacklist.forEach(word => {
        if(clean.includes(word)) {
            blocked = true;
        }
    });

    if(blocked) {
        triggerShutdown();
        return;
    }

    // 3. KONTROLA OTAZNÍKU
    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    // 4. SPECIÁLNÍ POZADÍ: LUBOŠ LOVEC (4 minuty)
    if (clean.includes("lubos") && clean.includes("lovec")) {
        document.body.style.backgroundImage = "url('hunter.jfif')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        setTimeout(() => { document.body.style.backgroundImage = "none"; }, 240000);
    }

    // 5. PROCES ANALÝZY
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    status.innerText = "PROHLEDÁVÁM MATRIX...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        let currentAnswer = "";

        // AUTOMATICKÝ VÝSLEDEK: Furry + Coufal
        if (clean.includes("furry") && clean.includes("coufal")) {
            currentAnswer = "Coufal 100% FURRY";
        } 
        else if (clean.includes("radek")) {
            currentAnswer = "JASNÝ ANO";
        } 
        else {
            const pos = ["ANO", "URČITĚ", "ROZHODNĚ", "BEZPOCHYBY"];
            const neg = ["NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ", "VYLOUČENO"];
            currentAnswer = Math.random() > 0.5 ? pos[Math.floor(Math.random()*pos.length)] : neg[Math.floor(Math.random()*neg.length)];
        }

        // Uložení do paměti
        lastQuestion = val;
        lastAnswer = currentAnswer;
        resultDiv.innerText = currentAnswer;
    }, 1500);
}
