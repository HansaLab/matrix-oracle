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
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Funkce pro vizuální změnu pozadí
function setBackgroundVisual(url, durationMs) {
    const body = document.body;
    // Nastavíme nový GIF natvrdo přes styl
    body.style.setProperty('background-image', `url('${url}')`, 'important');

    setTimeout(() => {
        // Po uplynutí času vrátíme původní pozadi.gif
        body.style.setProperty('background-image', "url('pozadi.gif')", 'important');
    }, durationMs);
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

    // KONTROLA BLACKLISTU (Tomáš opravu jsem nechal)
    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        if (cleanBadWord === "as") return inputWords.includes("as");
        return clean.includes(cleanBadWord);
    });

    if (isBanned || inputWords.includes("honza") || inputWords.includes("jan")) { 
        isDead = true;
        document.getElementById('idiot-overlay').style.display = "flex";
        return; 
    }

    // SPECIÁLNÍ GIF REAKCE
    let currentAnswer = "";

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

    // VÝSLEDEK
    resultDiv.innerText = "";
    status.style.color = "#00ff41";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        if (!currentAnswer) {
            const answers = ["ANO", "URČITĚ", "NE", "NIKDY", "VYLOUČENO"];
            currentAnswer = answers[Math.floor(Math.random() * answers.length)];
        }
        resultDiv.innerText = currentAnswer;
    }, 1000);
}
