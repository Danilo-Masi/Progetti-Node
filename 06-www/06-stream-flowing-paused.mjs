// Importa il modulo `fs/promises` per operazioni asincrone sui file
import fs from "fs/promises";

// Apre il file specificato in modalità di nsola lettura e ottine e un file handler (fh)
const fh = await fs.open("06-stream-flowing-paused.mjs");

// Crea un flusso di lettura dal file aperto
const fileStream = fh.createReadStream();

// Logga lo stato inziale del flusso
console.log(`Is Readable flowing? --> ${fileStream.readableFlowing}`);

// Logga un messagio
console.log("Waiting 2 seconds before adding the data event listener...");

// Timeout prima di aggiungere un listener per l'evento "data"
setTimeout(() => {
    console.log(`Is Readable flowing? --> ${fileStream.readableFlowing}`); // Logga lo stato del flusso
    fileStream.on("data", (chunk) => console.log(chunk)); // Listener per l'evento "data" che viene attivato quando il flusso di dati è disponibile
    console.log(`Is Readable flowing? --> ${fileStream.readableFlowing}`); // Logga lo stato del flusso
}, 2000);