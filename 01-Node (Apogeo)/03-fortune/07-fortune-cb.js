//*** Prende l'elenco dei file presenti in una directory, sceglie l'indiice di un file casuale tra quelli presenti 
//*** e stampa il contenuto del file che ha l'indice casuale trovato prima.

const fs = require("fs");

// Impostiamo una costante per il percorso della directory
const QUOTE_DIR = "./data";

// Otteniamo l'elenco del file presenti nella directory
fs.readdir(QUOTE_DIR, (err, files) => {
    if (err) {
        console.log("Error while reading data directory");
        return;
    }

    // Selezionamo un indice a caso tra i file presenti nella directory
    const randomIdx = Math.floor(Math.random() * files.length);
    // Impostiamo il file da leggere in base all'indice casuale ricercato prima
    const quoteFile = `${QUOTE_DIR}/${files[randomIdx]}`;

    // Leggiamo il contenuto del file selezionato prima
    fs.readFile(quoteFile, "utf-8", (err, data) => {
        if (err) {
            console.log("Error while reading quote file");
            return;
        }
        console.log(data);
    });
});