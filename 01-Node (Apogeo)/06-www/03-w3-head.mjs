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

// Funzione asicrona da richiamare a ogni richiesta ricevuta dal client
server.on("request", async (req, res) => {
    // Verifica se la richiesta è GET o HEAD
    const [isGET, isHEAD] = [req.method === "GET", req.method === "HEAD"];
    // Se il metodo non è GET o HEAD, restituisce un errore 405 (Method Not Allowed)
    if (!isGET && !isHEAD) {
        res.statusCode = 405;
        res.end();
        return;
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`;
    console.log(`Requested ${file} file`);

    // File handler da usare per operazioni sul file
    let fh;
    try {
        fh = await fs.open(file); // Tenta di aprire il file
    } catch (error) {
        console.error(error.message);
        res.statusCode = 404;
        res.end();
        return;
    }

    const mimeType = typesMap.get(extname(pathname));
    if (mimeType) {
        res.setHeader("Content-Type", mimeType);
    }

    // Se il metodo è HEAD
    if (isHEAD) {
        const fileStat = await fh.stat(); // Ottiene le statistiche del file
        res.setHeader("Content-Length", fileStat.size); // Imposta la lunghezza del contenuto nella risposta
        res.statusCode = 200; // Imposta lo stato HTTP a 200 (OK)
        res.end(); // Termina la risposta senza inviare il contenuto
        await fh.close(); // Chiude il file
        return;
    }

    try {
        const data = await fh.readFile();
        res.end(data);
    } catch (error) {
        console.error(error.message);
        res.statusCode = 500;
        res.end();
    } finally {
        await fh.close(); // Chiude il file in ogni caso
    }
});

server.listen(port, host, () => {
    console.log(`Web server running at http://${host}:${port}`);
});