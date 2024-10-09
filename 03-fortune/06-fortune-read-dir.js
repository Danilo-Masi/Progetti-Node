//*** Restituisce l'elenco dei file presenti in una directory.

const fs = require("fs");

// Funzione del modulo fs, per ottenere l'elenco dei file in una directory
fs.readdir("./data", (err, files) => {
    if (err) {
        console.log("Error while reading data directory");
        return;
    }
    console.log(files);
});