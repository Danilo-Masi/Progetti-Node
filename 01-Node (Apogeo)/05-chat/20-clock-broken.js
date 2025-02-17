// Importa il modulo `events`, che consente di creare e gestire eventi personalizzati in Node.js
const EventEmitter = require("events");

// Funzione che restituisce una stringa contenente l'ora corrente in formato `HH:MM:SS:MS`
function getTimeString() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    return time;
}

// Definisce la classe `Clock`, che estende `EventEmitter` per permettere di emettere e gestire eventi specifici per l'orologio
class Clock extends EventEmitter { }

// Crea una nuova istanza di `Clock`, rappresentando un orologio che può emettere eventi
const clock = new Clock();

// Registra un listener per l'evento "tick"
clock.on("tick", () => {
    console.log(`[1] The clock ticked: ${getTimeString()}`);
});

// Registra un listener per l'evento "error"
// Questo listener gestisce eventuali errori emettendo un messaggio con il dettaglio dell'errore
clock.on("error", (err) => {
    console.log(`Got ${err}`);
});

// Usa `setInterval` per emettere l'evento "tick" ogni secondo (1000 ms)
// Dopo l'emissione di "tick", stampa un messaggio "Post tick" con l'ora corrente
setInterval(() => {
    clock.emit("tick");
    console.log(`Post tick at ${getTimeString()}`);
}, 1000);

// Usa `setTimeout` per emettere l'evento "error" dopo 3 secondi (3000 ms)
// Simula un errore nell'orologio emettendo un messaggio di errore specifico
setTimeout(() => {
    clock.emit("error", new Error("The clock is broken"));
}, 3000);