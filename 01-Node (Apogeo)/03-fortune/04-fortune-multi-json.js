//*** Prende un indice casuale in un array di citazioni (che in questo esempio si trovano in file esterno json) e stampa la citazione con quell'indice.

// Carica il file json contenente l'array di citazioni
const quotes = require("./quotes.json");

// Genera un indice casuale dell'array di citazioni
const randomIdx = Math.floor(Math.random() * quotes.length);

console.log(quotes[randomIdx]);
