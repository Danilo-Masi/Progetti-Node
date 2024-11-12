// Importa il modulo `net`, che permette di creare server e client TCP
const net = require("net");

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

// Inizializza una variabile per contare il numero di pacchetti di dati ricevuti
let dataCount = 0;

// Aggiunge un listener per l'evento `connection`, che viene emesso quando un client si connette
server.on("connection", function (sock) {
    // Una volta che un client si connette, aggiunge un listener per l'evento `data`
    sock.on("data", function (data) {
        // Incrementa il contatore ogni volta che viene ricevuto un pacchetto di dati
        dataCount++;
        // Stampa il valore di `dataCount` e il numero di byte contenuti nel pacchetto di dati ricevuto
        console.log(`dataCount is ${dataCount} and data contains ${data.byteLength} bytes`);
    });
});