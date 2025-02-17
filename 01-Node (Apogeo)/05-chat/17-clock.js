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
// Ogni volta che l'evento viene emesso, il listener stampa l'ora corrente sulla console
clock.on("tick", () => {
    console.log(`The clock ticked: ${getTimeString()}`);
});

// Utilizza un `setInterval` per emettere l'evento "tick" ogni 1000ms
setInterval(() => {
    clock.emit("tick");
}, 1000);