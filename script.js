body {
    margin: 0;
    background-color: #000;
    background-image: url('pozadi.gif');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: #00ff41;
    font-family: 'Courier New', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.terminal {
    width: 90%;
    max-width: 650px;
    border: 2px solid #00ff41;
    padding: 40px;
    background: rgba(0, 10, 0, 0.9);
    box-shadow: 0 0 30px #00ff41;
    text-align: center;
    position: relative;
    border-radius: 25px;
    z-index: 10;
}

.ears-style {
    position: absolute;
    top: -140px;
    left: 50%;
    transform: translateX(-50%);
    width: 320px;
    z-index: 20;
    pointer-events: none;
}

.special-bg-gif {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.hmm-side-gif {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 22%;
    max-width: 280px;
    z-index: 5;
    border-radius: 20px;
}

.hmm-left { left: 30px; }
.hmm-right { right: 30px; }

/* OBRAZOVKA PŘI BANU */
#idiot-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(150, 0, 0, 0.6); /* Červený závoj */
    background-blend-mode: darken;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: white;
    text-align: center;
}

#idiot-overlay h1 {
    font-size: 3.5rem;
    text-shadow: 2px 2px 10px black;
    margin: 0;
}

input {
    width: 80%;
    background: rgba(0, 30, 0, 0.5);
    border: 1px solid #00ff41;
    border-radius: 10px;
    color: #fff;
    padding: 10px;
    text-align: center;
    outline: none;
}

button {
    margin-top: 30px;
    background: #00ff41;
    color: #000;
    border: none;
    border-radius: 12px;
    padding: 15px 40px;
    font-weight: bold;
    cursor: pointer;
}
