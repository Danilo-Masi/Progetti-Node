// Importa il modulo `events`, che consente di creare e gestire eventi personalizzati in Node.js
const EventEmitter = require("events");

// Funzione che restituisce una stringa contenente l'ora corrente in formato `HH:MM:SS:MS`
function getTimeString() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    return time;
}

// Definisce la classe `Clock`, che estende `EventEmitter` per gestire eventi specifici per l'orologio
class Clock extends EventEmitter { }

// Crea una nuova istanza di `Clock` con l'opzione `captureRejections` impostata a `true`
// Questa opzione consente di intercettare eventuali errori generati dai listener asincroni e gestirli tramite un evento "error"
const clock = new Clock({ captureRejections: true });

// Registra un listener asincrono per l'evento "tick"
// Il listener genera intenzionalmente un errore per testare la gestione degli errori
clock.on("tick", async () => {
    throw new Error("broken listener");
});

// Registra un listener per l'evento "error"
// Questo listener gestisce eventuali errori emessi, stampando un messaggio che descrive l'errore
clock.on("error", (err) => {
    console.log(`Got ${err}`);
});

// Usa `setInterval` per emettere l'evento "tick" ogni secondo (1000 ms)
// Dopo l'emissione dell'evento "tick", stampa un messaggio "Post tick" con l'ora corrente
setInterval(() => {
    clock.emit("tick");
    console.log(`Post tick at ${getTimeString()}`);
}, 1000);

// Usa `setTimeout` per emettere un evento "error" dopo 3 secondi (3000 ms)
// Simula un errore nell'orologio emettendo un messaggio di errore specifico
setTimeout(() => {
    clock.emit("error", new Error("The clock is broken"));
}, 3000);