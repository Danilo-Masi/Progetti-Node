// Importa il modulo `net`, che permette di creare server e client TCP
const net = require("net");
// Importa le funzioni `broadcastMessage`, `getSocketsExcluding`, `removeCRLF`, `socketToId`, e `colorGrey` dal modulo `chat-utils`
const { broadcastMessage, getSocketsExcluding, removeCRLF, socketToId, colorGrey } = require("./chat-utils");

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

// Mappa per memorizzare i nomi dei client associati ai loro socket
let namesMap = {};

// Imposta un nome per il client specificato da `sock`
function setName(sock, name) {
    namesMap[socketToId(sock)] = name;
}

// Restituisce il nome del client specificato da `sock`
function getName(sock) {
    return namesMap[socketToId(sock)];
}

// Inizializza un array per memorizzare i socket dei client connessi
let sockets = [];

// Funzione per elaborare i messaggi ricevuti da un client
function processMessage(sock, message) {
    // Rimuove eventuali caratteri di fine linea dal messaggio
    const cleanMsg = removeCRLF(message);
    // Gestisce il comando per cambiare nickname del client
    if (cleanMsg.startsWith("/nick ")) {
        const oldName = getName(sock);
        const [_, name] = cleanMsg.split(" ");
        setName(sock, name);
        broadcastMessage(sockets, `${colorGrey(`${oldName} is now ${name}\n`)}`);
    } else {
        // Invia il messaggio agli altri client
        broadcastMessage(getSocketsExcluding(sockets, sock), `<${getName(sock)}> ${cleanMsg}\n`)
    }
}

// Aggiunge un listener per l'evento `connection`, che viene emesso quando un client si connette
server.on("connection", function (sock) {
    // Stampa l'indirizzo IP e la porta del client che si connette
    console.log(`CONNECTED: ${socketToId(sock)}`);
    // Aggiunge il nuovo socket alla lista dei socket connessi
    sockets.push(sock);
    // Imposta un nome di default per il client appena connesso
    setName(sock, socketToId(sock));
    // Una volta che un client si connette, aggiunge un listener per l'evento `data`
    sock.on("data", function (data) {
        // Elabora il messaggio ricevuto e lo diffonde agli altri client
        processMessage(sock, data.toString());
    });
});