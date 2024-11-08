// Importa il modulo http per creare il server
const http = require("http");

// Definisce l'host e la porta del server
const host = "127.0.0.1";
const port = 3000;

// Crea il server HTTP
const server = http.createServer((req, res) => {
    
    // Analizza l'header "Accept" per determinare il tipo di risposta preferito dal client
    const acceptJson = req.headers.accept === "application/json"; // Verifica se il client accetta JSON
    const acceptText = req.headers.accept === "text/plain"; // Verifica se il client accetta testo semplice
    const acceptAnyText = req.headers.accept === "text/*"; // Verifica se il client accetta qualsiasi sottotipo di testo
    const acceptAnyType = req.headers.accept === "*/*"; // Verifica se il client accetta qualsiasi tipo di contenuto

    if (acceptJson) {
        // Se il client accetta JSON, risponde con un messaggio in formato JSON
        resJson(res);
    } else if (acceptText || acceptAnyText || acceptAnyType) {
        // Se il client accetta testo semplice, qualsiasi sottotipo di testo, o qualsiasi tipo, risponde con testo
        resText(res);
    } else {
        // Se il client non accetta nessuno dei tipi supportati, restituisce lo status 406 (Not Acceptable)
        res.statusCode = 406;
        res.end();
    }
});

// Funzione per rispondere con dati in formato JSON
function resJson(res) {
    res.statusCode = 200; // Imposta il codice di stato HTTP a 200 (OK)
    res.setHeader("Content-Type", "application/json"); // Imposta l'header "Content-Type" a JSON
    res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP --- json" })); // Invia un messaggio JSON come risposta
}

// Funzione per rispondere con dati in formato testo semplice
function resText(res) {
    res.statusCode = 200; // Imposta il codice di stato HTTP a 200 (OK)
    res.setHeader("Content-Type", "text/plain"); // Imposta l'header "Content-Type" a testo semplice
    res.end("Benvenuto nella biblioteca HTTP --- text"); // Invia un messaggio di testo come risposta
}

// Avvia il server in ascolto su host e porta specificati, stampando un messaggio di conferma nella console
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});