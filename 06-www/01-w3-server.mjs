// Importa il modulo `http` per creare il server web
import http from "http";
// Importa il modulo `fs/promises` per operazioni asincrone sui file
import fs from "fs/promises";

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
    const { pathname } = new URL(req.url, `http://${req.headers.host}`); // Estrae il percorso richiesto dal client
    const file = `${root}${pathname}`; // Costruisce il percorso compelto del file richiesto
    console.log(`Requested ${file} file`); // Logga il file richiesto per debugging
    try {
        const data = await fs.readFile(file); // Legge il contenuto del file richiesto
        res.end(data); // Invia il contenuto del file come risposta al client
    } catch (error) {
        console.error(error.message); // Logga eventuali errori di lettura
        res.statusCode = 404; // Imposta lo stato HTTP a 404 (Not Found)
        res.end(); // Termina la risposta senza contenuto
    }
});

// Avvia il server in ascolto su host e porta specificati
server.listen(port, host, () => {
    console.log(`Web server running at http://${host}:${port}`);
});