const blacklist = ["hitler", "motoriste", "zide", "zid", "nsdap", "pirati", "ano", "komuniste", "stacilo", "spd", "okamura", "fasismus", "nacismus"];
let isDead = false;

function monitorInput(val) {
    if(isDead) return;
    const raw = val.toLowerCase();
    const clean = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // AKTIVACE UŠÍ
    if(raw.includes("radek")) {
        let terminal = document.getElementById('terminal-ui');
        // Pokud uši ještě neexistují, vytvoříme je
        if (!document.getElementById('radek-ears')) {
            let earsImg = document.createElement('img');
            earsImg.id = 'radek-ears';
            earsImg.src = 'radek.gif'; // Ujisti se, že soubor na GitHubu je přesně radek.gif
            earsImg.className = 'ears-style';
            terminal.appendChild(earsImg);
            
            // Po 2 minutách je zase smažeme
            setTimeout(() => {
                if(earsImg) earsImg.remove();
            }, 120000);
        }
    }

    if (clean.includes("furry") || clean.includes("coufal")) {
        document.getElementById('furry-label').style.display = "block";
    }

    if (clean.includes("lubosek") && clean.includes("hunter")) {
        window.location.href = "https://www.youtube.com/shorts/l2pw-TiT4Tk";
    }

    blacklist.forEach(word => {
        if(clean.includes(word)) triggerShutdown();
    });
}

function triggerShutdown() {
    isDead = true;
    document.getElementById('idiot-overlay').style.display = "flex";
}

function startProcess() {
    if(isDead) return;
    const input = document.getElementById('user-input').value.trim();
    const status = document.getElementById('status-bar');

    if (!input.endsWith('?')) {
        status.innerText = "CHYBA: MUSÍ KONČIT OTAZNÍKEM!";
        status.style.color = "red";
        return;
    }

    document.getElementById('final-result').innerText = "";
    status.style.color = "#00ff41";
    status.innerText = "DEŠIFRUJI...";
    
    setTimeout(() => {
        status.innerText = "VÝSLEDEK NALEZEN!";
        const pos = ["ANO", "URČITĚ", "ROZHODNĚ"];
        const neg = ["NE", "NIKDY", "VYLOUČENO"];
        document.getElementById('final-result').innerText = Math.random() > 0.5 ? 
            pos[Math.floor(Math.random()*pos.length)] : neg[Math.floor(Math.random()*neg.length)];
    }, 1500);
}
