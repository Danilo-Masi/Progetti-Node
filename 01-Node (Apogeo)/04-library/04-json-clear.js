// Importa il modulo http per creare il server
const http = require("http");

// Definisce l'host e la porta del server
const host = "127.0.0.1";
const port = 3000;

// Crea il server HTTP
const server = http.createServer((req, res) => {
    // Imposta lo stato della risposta HTTP a 200 (OK)
    res.statusCode = 200;
    // Imposta l'header "Content-Type" per indicare che la risposta è in formato JSON
    res.setHeader("Content-Type", "application/json");
    // Invia una risposta JSON con un messaggio di benvenuto
    res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }));
});

// Avvia il server in ascolto su host e porta specificati, stampando un messaggio di conferma nella console
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});