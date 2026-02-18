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

function getCleanText(text) {
    if (!text) return "";
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function setBackgroundVisual(url, durationMs) {
    const oldGifs = document.querySelectorAll('.active-special');
    oldGifs.forEach(g => g.remove());

    if (url === 'hmm.gif') {
        const leftCat = document.createElement('img');
        const rightCat = document.createElement('img');
        
        leftCat.src = rightCat.src = url;
        leftCat.className = 'hmm-side-gif hmm-left active-special';
        rightCat.className = 'hmm-side-gif hmm-right active-special';
        
        document.body.appendChild(leftCat);
        document.body.appendChild(rightCat);

        setTimeout(() => {
            leftCat.remove();
            rightCat.remove();
        }, durationMs);
    } else {
        const gifImg = document.createElement('img');
        gifImg.src = url;
        gifImg.className = 'special-bg-gif active-special';
        document.body.appendChild(gifImg);

        setTimeout(() => {
            gifImg.remove();
        }, durationMs);
    }
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

    if(!inputField || !status || !resultDiv) return;

    const val = inputField.value.trim();
    if (!val) return;

    const clean = getCleanText(val);
    const inputWords = clean.replace(/[?]/g, "").split(/\s+/);

    if (val === lastQuestion && lastAnswer !== "") {
        resultDiv.innerText = lastAnswer;
        status.innerText = "OSUD JE JIŽ DANÝ...";
        return;
    }

    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        if (cleanBadWord === "as") return inputWords.includes("as");
        return inputWords.includes(cleanBadWord) || clean.includes(cleanBadWord + " ");
    });

    if (isBanned || inputWords.includes("honza") || inputWords.includes("jan")) { 
        triggerShutdown(); 
        return; 
    }

    let currentAnswer = "";

    if (clean.includes("plant") && clean.includes("bomb")) {
        setBackgroundVisual('dance.gif', 300000); 
        status.innerText = "BOMBA POLOŽENA. PARTY ZAČÍNÁ...";
        currentAnswer = "DANCE TIME !";
    } 
    else if (weirdWords.some(word => inputWords.includes(word))) {
        setBackgroundVisual('hmm.gif', 10000); 
        status.innerText = "What is wrong with you?";
        currentAnswer = "Why are you BLUE?";
    }

    if (!val.endsWith('?') && !currentAnswer) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        resultDiv.innerText = "";
        return;
    }

    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    status.innerText = "PROHLEDÁVÁM MATRIX...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        if (!currentAnswer) {
            const answers = ["ANO", "URČITĚ", "ROZHODNĚ", "NE", "NIKDY", "V ŽÁDNÉM PŘÍPADĚ"];
            currentAnswer = answers[Math.floor(Math.random() * answers.length)];
        }
        lastQuestion = val;
        lastAnswer = currentAnswer;
        resultDiv.innerText = currentAnswer;
    }, 1000);
}

// TOTO ZAJISTÍ, ŽE TLAČÍTKO BUDE REAGOVAT
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('button');
    if(btn) btn.onclick = startProcess;
    
    const input = document.getElementById('user-input');
    if(input) input.oninput = (e) => monitorInput(e.target.value);
});

