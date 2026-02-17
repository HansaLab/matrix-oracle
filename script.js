let isDead = false;
let lastQuestion = ""; // Proměnná pro uložení poslední otázky
let lastAnswer = "";   // Proměnná pro uložení poslední odpovědi

function monitorInput(val) {
    if(isDead) return;
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const terminal = document.querySelector('.terminal');

    // Radek uši zůstávají dle původního zadání
    if(clean.includes("radek")) {
        if (!document.getElementById('radek-ears')) {
            const earsImg = document.createElement('img');
            earsImg.id = 'radek-ears';
            earsImg.src = 'radek.gif'; 
            earsImg.className = 'ears-style';
            terminal.appendChild(earsImg);
            setTimeout(() => { if(earsImg) earsImg.remove(); }, 60000);
        }
    }

    // NOVÝ EASTER EGG: Okurka Znojmia na boky
    if(clean.includes("okurka")) {
        if (!document.getElementById('znojmia-left')) {
            const leftOkurka = document.createElement('img');
            leftOkurka.id = 'znojmia-left';
            leftOkurka.src = 'https://www.znojmia.cz/getattachment/9871583d-e592-487c-bc24-583569804e1c/okurky.aspx'; // Nutno nahradit tvým souborem pokud máš
            leftOkurka.style = "position:fixed; left:0; top:50%; transform:translateY(-50%); width:150px; z-index:100;";
            document.body.appendChild(leftOkurka);

            const rightOkurka = leftOkurka.cloneNode();
            rightOkurka.id = 'znojmia-right';
            rightOkurka.style.left = "auto";
            rightOkurka.style.right = "0";
            document.body.appendChild(rightOkurka);
        }
    }
}

function startProcess() {
    if(isDead) return;
    const inputField = document.getElementById('user-input');
    const val = inputField.value.trim();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const status = document.getElementById('status-bar');
    const resultDiv = document.getElementById('final-result');

    // Kontrola duplicity: Pokud je otázka stejná, nevyhodnocuj znovu náhodně
    if (val === lastQuestion && lastAnswer !== "") {
        resultDiv.innerText = lastAnswer;
        status.innerText = "VÝSLEDEK (Z PAMĚTI):";
        return;
    }

    // Blacklist a cenzura (ponecháno z tvého kódu)
    if (clean.includes("honza") || clean.includes("jan")) { triggerShutdown(); return; }
    let blocked = false;
    blacklist.forEach(word => { if(clean.includes(word)) { triggerShutdown(); blocked = true; } });
    if(blocked) return;

    if (!val.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        return;
    }

    // EASTER EGG: Luboš a Lovec na 4 minuty (240 000 ms)
    if (clean.includes("lubos") && clean.includes("lovec")) {
        document.body.style.backgroundImage = "url('hunter.jfif')";
        document.body.style.backgroundSize = "cover";
        setTimeout(() => { document.body.style.backgroundImage = "none"; }, 240000);
    }

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

        // Uložení pro příště
        lastQuestion = val;
        lastAnswer = currentAnswer;
        resultDiv.innerText = currentAnswer;
    }, 1500);
}
