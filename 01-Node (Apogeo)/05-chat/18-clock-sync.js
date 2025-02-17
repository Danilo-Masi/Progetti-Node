// Importa il modulo che permette di creare e gestire eventi personalizzati
const EventEmitter = require("events");

// Funzione che restituisce una stringa contente l'ora in formato `HH:MM:SS:MS`
function getTimeString() {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    return time;
}

// Deginisce la classe che estende `EventEmitter` per poter emettere e gestire eventi specifici per l'orologio
class Clock extends EventEmitter { }

// Crea una nuova istanza di `Clock`
const clock = new Clock();

// Registra un listener per l'evento "tick"
clock.on("tick", () => {
    console.log(`[1] The clock ticked: ${getTimeString()}`);
});

// Registra un listener per l'evento "tick"
clock.on("tick", () => {
    console.log(`[2] The clock ticked: ${getTimeString()}`);
});

// Registra un listener per l'evento "tick"
clock.on("tick", () => {
    console.log(`[3] The clock ticked: ${getTimeString()}`);
});

// Usa `setInterval` per emettere l'evento "tick" ogni secondo (1000 ms)
// Dopo l'emissione di "tick", stampa un messaggio "Post tick" con l'ora corrente
setInterval(() => {
    clock.emit("tick");
    console.log(`Post tick at ${getTimeString()}`);
}, 1000);