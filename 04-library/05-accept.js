// Importa il modulo http per creare il server
const http = require("http");

// Definisce l'host e la porta del server
const host = "127.0.0.1";
const port = 3000;

// Crea il server HTTP
const server = http.createServer((req, res) => {
    // Analizza l'header "Accept" per determinare se il client preferisce JSON o testo semplice
    const acceptJson = req.headers.accept === "application/json";
    const acceptText = req.headers.accept === "text/plain";

    if (acceptJson) {
        // Se il client accetta JSON, risponde con un messaggio in formato JSON
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP --- json" }));
    } else if (acceptText) {
        // Se il client accetta testo semplice, risponde con un messaggio in formato testo
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Benvenuto nella biblioteca HTTP --- text");
    } else {
        // Se il client non accetta nessuno dei tipi supportati, restituisce lo status 406 (Not Acceptable)
        res.statusCode = 406;
        res.end();
    }
});

// Avvia il server in ascolto su host e porta specificati, stampando un messaggio di conferma nella console
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});