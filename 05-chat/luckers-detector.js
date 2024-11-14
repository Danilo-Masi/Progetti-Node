// Importa il modulo `events`, che consente di creare e gestire eventi personalizzati in Node.js
const EventEmitter = require("events");

// Definisce la classe `LukersDetector`, che estende `EventEmitter` per rilevare utenti inattivi
class LukersDetector extends EventEmitter {

    constructor(tSec) {
        super();
        this.users = {};
        this.timeoutMS = tSec * 1000;
    }

    // Metodo per aggiungere un nuovo utente e iniziare il conto alla rovescia per l'inattività
    addUser(name) {
        this.users[name] = setTimeout(() => {
            // Allo scadere del timeout, emette un evento "luker detected" con il nome dell'utente
            this.emit("luker detected", name);
        }, this.timeoutMS);
    }

    // Metodo per aggiornare l'attività dell'utente, resetta il timeout di inattività
    touchUser(name) {
        clearTimeout(this.users[name]);  // Cancella il timeout corrente per l'utente
        this.addUser(name); // Riavvia il timeout per l'utente, indicando che è attivo
    }

    // Metodo per rimuovere un utente e annullare il suo timeout
    removeUser(name) {
        clearTimeout(this.users[name]);  // Cancella il timeout corrente per l'utente
        delete this.users[name]; // Rimuove l'utente dall'elenco
    }

    // Metodo per rinominare un utente, spostando il timeout dal vecchio nome al nuovo nome
    renameUser(oldName, newName) {
        this.removeUser(oldName); // Rimuove il vecchio nome dell'utente e il relativo timeout
        this.addUser(newName); // Aggiunge il nuovo nome e imposta un nuovo timeout di inattività
    }
}

module.exports = LukersDetector;