// Importa il modulo http per creare il server
const http = require("http");

// Crea il server HTTP
const server = http.createServer((req, res) => {
    // Risponde con un messaggio di benvenuto
    res.end("Benvenuto nella biblioteca HTTP");
});

// Avvia il server in ascolto sulla porta 3000
server.listen(3000, () => {
    // Stampa un messaggio di conferma quando il server è in esecuzione
    console.log("Server running");
});