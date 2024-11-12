// Importa il modulo `net`, che permette di creare server e client TCP
const net = require("net");
// Importa la funzione `inspect` dal modulo `util`, utile per convertire i dati ricevuti in un formato leggibile
const { inspect } = require("util");

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

// Aggiunge un listener per l'evento `connection`, che viene emesso quando un client si connette
server.on("connection", function (sock) {
    // Una volta che un client si connette, aggiunge un listener per l'evento `data`
    sock.on("data", function (data) {
        // Utilizza `inspect` per visualizzare i dati ricevuti in un formato leggibile e li invia al client
        sock.write(`Received ${inspect(data)}\n`);
        // Quando il server riceve dei dati dal client, li restituisce con il prefisso "ECHO: "
        sock.write("ECHO: " + data);
    });
});