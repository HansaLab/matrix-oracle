// Pomocná funkce pro změnu vizuálu na pozadí (opravená)
function setBackgroundVisual(url, durationMs) {
    const body = document.body;
    const oldBg = body.style.backgroundImage; // Schováme si původní matrix GIF

    body.style.setProperty('background-image', `url('${url}')`, 'important');
    
    setTimeout(() => {
        // Vrátíme tam původní pozadí (nebo ho prostě smažeme, pokud je v CSS)
        body.style.removeProperty('background-image');
    }, durationMs);
}

// Ve funkci startProcess() uprav kontrolu blacklistu takto:
function startProcess() {
    if(isDead) return;

    const inputField = document.getElementById('user-input');
    const val = inputField.value.trim();
    const clean = getCleanText(val);
    const inputWords = clean.replace(/[?]/g, "").split(/\s+/);

    // OPRAVA TOMÁŠE: Kontrolujeme jen celá slova
    const isBanned = blacklist.some(badWord => {
        const cleanBadWord = getCleanText(badWord);
        if (cleanBadWord.length <= 2) {
            return inputWords.includes(cleanBadWord); // "as" musí být samostatné slovo
        }
        return clean.includes(cleanBadWord);
    });

    if (isBanned) { triggerShutdown(); return; }

    // SPECIÁLNÍ GIFy
    if (clean.includes("plant") && clean.includes("bomb")) {
        setBackgroundVisual('dance.gif', 300000); // 5 minut tanec
        document.getElementById('final-result').innerText = "DANCE TIME!";
    } else if (weirdWords.some(word => clean.includes(word))) {
        setBackgroundVisual('hmm.gif', 10000); // 10 vteřin kočka
    }
    
    // ... zbytek tvého kódu (otazník atd.)
}
