// Importa il modulo che permette di creare e gestire eventi personalizzati
const EventEmitter = require("events");

// Crea una nuova istanza di `EventEmitter` che permette di emettere e ascoltare eventi
const emitter = new EventEmitter();

// Registra un listener per l'evento chiamato "event"
// Quando l'evento viene emesso, la funzione viene eseguita e stampa un messaggio in console
emitter.on("event", () => {
    console.log("an event occured!");
});

// Emette l'evento "event", attivando cosi il listener registrato in precedenza
emitter.emit("event");