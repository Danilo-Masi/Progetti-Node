// Importa il modulo `net`, che permette di creare server e client TCP
const net = require("net");
// Importa la funzione `isSameSocket` dal modulo `chat-utils`
const { isSameSocket } = require("./chat-utils");

// Definisce la porta (5050) e l'indirizzo IP (localhost) su cui il server TCP ascolterà
const port = 5050;
const host = "127.0.0.1";

// Crea un nuovo server TCP
const server = net.createServer();

// Avvia il server TCP, facendolo ascoltare sulla porta 5050 e sull'indirizzo 127.0.0.1
server.listen(port, host, () => {
    // Quando il server è pronto ad accettare connessioni, stampa un messaggio sulla console
    console.log(`TCP server running at ${host} on port ${port}`);
});

// Inizializza un array per memorizzare i socket dei client connessi
let sockets = [];

// Aggiunge un listener per l'evento `connection`, che viene emesso quando un client si connette
server.on("connection", function (sock) {
    // Stampa l'indirizzo IP e la porta del client che si connette
    console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`);
    // Aggiunge il nuovo socket alla lista dei socket connessi
    sockets.push(sock);
    // Una volta che un client si connette, aggiunge un listener per l'evento `data`
    sock.on("data", function (data) {
        // Definisce la variabile `sender` con l'indirizzo e la porta del client
        const sender = `${sock.remoteAddress}:${sock.remotePort}`;
        // Per ogni socket connesso, invia i dati ricevuti dal client, eccetto al client che li ha inviati
        sockets.forEach((s) => {
            if (!isSameSocket(s, sock)) {
                s.write(`<${sender}> ${data}`);
            }
        });
    });
});