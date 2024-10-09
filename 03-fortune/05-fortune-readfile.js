//*** Legge uno specifico file esterno in formato txt.

// Importo il modulo per leggere i file dal file system
const fs = require("fs");

// Funzione del modulo fs, per leggere un file dal file system
fs.readFile("./data/003.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error while reading quote file");
        return;
    }
    console.log(data);
});