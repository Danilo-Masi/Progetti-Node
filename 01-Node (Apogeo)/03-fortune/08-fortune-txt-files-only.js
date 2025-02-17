//*** Fa tutto quello che fa la funzione nel file 07, pero prende in esame solo i file che hanno un estensione .txt

const fs = require("fs");

const QUOTE_DIR = "./data";

fs.readdir(QUOTE_DIR, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log("Error while reading data directory");
        return;
    }

    // Dalla directory preleviamo solo i file con il formato che ci interessa 
    // (in questo caso txt) e li mettiamo in un nuovo array
    const txtFiles = files
        .filter((f) => f.isFile() && f.name.endsWith(".txt"))
        .map((f) => f.name);

    const randomIdx = Math.floor(Math.random() * files.length);
    const quoteFile = `${QUOTE_DIR}/${txtFiles[randomIdx]}`;

    fs.readFile(quoteFile, "utf-8", (err, data) => {
        if (err) {
            console.log("Error while reading quote file");
            return;
        }
        console.log(data);
    });
});