// Importa il modulo `net`, che permette di creare server e client TCP
const net = require("net");
// Importa le funzioni `broadcastMessage`, `getSocketsExcluding`, e `removeCRLF` dal modulo `chat-utils`
const { broadcastMessage, getSocketsExcluding, removeCRLF } = require("./chat-utils");

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

// Funzione per elaborare i messaggi ricevuti da un client
function processMessage(sock, message) {
    // Rimuove eventuali caratteri di fine linea dal messaggio
    const cleanMsg = removeCRLF(message);
    // Ottiene l'indirizzo e la porta del client che ha inviato il messaggio
    const sender = `${sock.remoteAddress}:${sock.remotePort}`;
    // Diffonde il messaggio pulito a tutti i client connessi, escluso il mittente
    broadcastMessage(getSocketsExcluding(sockets, sock), `<${sender}> ${cleanMsg}\n`);
}

// Aggiunge un listener per l'evento `connection`, che viene emesso quando un client si connette
server.on("connection", function (sock) {
    // Stampa l'indirizzo IP e la porta del client che si connette
    console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`);
    // Aggiunge il nuovo socket alla lista dei socket connessi
    sockets.push(sock);
    // Una volta che un client si connette, aggiunge un listener per l'evento `data`
    sock.on("data", function (data) {
        // Elabora il messaggio ricevuto e lo diffonde agli altri client
        processMessage(sock, data.toString());
    });
});