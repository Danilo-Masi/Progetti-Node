// Importa il modulo `http` per creare il server web
import http from "http";
// Importa il modulo `fs/promises` per operazioni asincrone sui file
import fs from "fs/promises";
// Importa una mappa per associare estensioni di file a tipi MIME
import typesMap from "./media-types.mjs";
// Importa una funzione per ottenere l'estensione di un file dal suo percorso
import { extname } from "path";

// Indirizzi IP locale del server
const host = "127.0.0.1";
// Porta su cui il server ascolterà
const port = 3000;
// Directory di base per i file da servire
const root = "files";

// Crea un'istanza del server HTTP
const server = http.createServer();

// Imposta un listener "request" per gestire le chiamate HTTP
server.on("request", async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`;
    console.log(`Requested ${file} file`);

    // Ottiene il tipo MIME associato all'estensione del file richiesto
    const fileType = typesMap.get(extname(pathname));
    if (fileType) {
        res.setHeader("Content-Type", fileType); // Imposta l'intestazione Content-Type nella risposta HTTP
    }

    try {
        const data = await fs.readFile(file);
        res.end(data);
    } catch (error) {
        console.error(error.message);
        res.statusCode = 404;
        res.end();
    }
});

// Avvia il server in ascolto su host e porta specificati
server.listen(port, host, () => {
    console.log(`Web server running at http://${host}:${port}`);
});