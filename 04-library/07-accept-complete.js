// Importa il modulo http per creare il server
const http = require("http");

// Definisce l'host e la porta del server
const host = "127.0.0.1";
const port = 3000;

// Crea il server HTTP
const server = http.createServer((req, res) => {
    // Ottiene la lista dei tipi di contenuto che il client accetta, dall'header "Accept"
    const acceptList = req.headers.accept.split(",");
    // Per ogni tipo di contenuto accettato, elimina i pramentri (es. ";q=0.9") e ottiene solo il tipo principale
    const acceptTypes = acceptList.map((a) => a.split(";")[0]);

    // Verifica se il client accetta JSON
    const acceptJson = acceptTypes.includes("application/json");
    // Verifica se il client accetta testo semplice
    const acceptText = acceptTypes.includes("text/plain");
    // Verifica se il client accetta qualsiasi tipo di testo
    const acceptAnyText = acceptTypes.includes("text/*");
    // Verifica se il client accetta qualsiasi tipo di contenuto
    const acceptAnyType = acceptTypes.includes("*/*");

    if (acceptJson) {
        // Risponde con JSON se il client lo accetta
        resJson(res);
    } else if (acceptText || acceptAnyText || acceptAnyType) {
        // Risponde con testo semplice se il client accetta testo o qualsiasi tipo
        resText(res);
    } else {
        // Se il client non accetta nessuno dei tipi supportati, risponde con lo status 406 (Not Acceptable)
        res.statusCode = 406;
        res.end();
    }
});

// Funzione per rispondere con JSON
function resJson(res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP --- json" }));
}

// Funzione per rispondere con testo semplice
function resText(res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Benvenuto nella biblioteca HTTP --- text");
}

// Avvia il server in ascolto su host e porta definiti, con un messaggio di conferma nella console
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});