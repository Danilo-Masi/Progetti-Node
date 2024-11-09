// Importa il modulo `net`, che permette di creare server e client TCP
const net = require("net");

// Definisce la porta e l'indirizzo IP (localhost) su cui il server TCP ascolterà
const port = 5050;
const host = "127.0.0.1";

// Crea un nuovo server TCP
const server = net.createServer();

// Avvia il server TCP, facendolo ascoltare sulla porta 5050 e sull'indirizzo 127.0.0.1
server.listen(port, host, () => {
    // Quando il server è pronto ad accettare connessioni, stampa un messaggio sulla console
    console.log(`TCP server running at ${host} on port ${port}`);
});

// Aggiunge un listener per l'evento `connection` (ogni volta che un client si connette)
server.on("connection", () => console.log("connection"));